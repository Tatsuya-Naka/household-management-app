"use server";

import { auth } from "@/auth";
import { generateDateFormat } from "@/data/date";
import { db } from "@/lib/db";
import paths from "@/paths";
import { EditExpensesSchema, EditIncomeSchema } from "@/schemas/new-record";
import { EditItemsType } from "@/type/records";
import dayjs from "dayjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface RecordsState {
  errors: {
    genre?: string[]; payment?: string[]; regular_unit?: string[]; regular_num?: string[];
    items?: string[],
    date?: string[]; type?: string[]; currency?: string[]; country?: string[]; comment?: string[]; object?: string[];
    resource?: string[], income_amount?: string[]; income_category?: string[]; status?: string[];
    _form?: string[];
  }
}

interface RecordsProps {
  type: string | undefined;
  currency: string;
  country: string;
  date: Date;
  regular_unit: string | null | undefined;
  items: EditItemsType[];
  recordId: string | undefined;
  payment: string | null | undefined;
  status: string;
  isSubmitted: boolean;
  imageCondition: {isStored: boolean, isDeleted: boolean};
}
export async function appliedToRecords({ type, currency, country, date, regular_unit, items, recordId, payment, status, isSubmitted, imageCondition }: RecordsProps, formState: RecordsState, formData: FormData): Promise<RecordsState> {
  "use server";
  const session = await auth();
  if (!session || !recordId) {
    return {
      errors: {
        _form: ["Invalid access"],
      }
    }
  }

  // TODO: trigger sqs queue based on imageCondition
  // if imageCondition.isStored, update image object on s3
  // else if imageCondition.isDelete delete image object on s3

  if (type === "expenses") {
    const validateFields = EditExpensesSchema.safeParse({
      date: date, currency: currency, genre: formData.get("genre"), country: country, items: items,
      comment: formData.get("comment"), payment: payment, regular_unit, regular_num: formData.get("regular_num"),
    });
    if (!validateFields.success) {
      return {
        errors: validateFields.error.flatten().fieldErrors,
      }
    }

    const data = validateFields.data;

    const findRecord = await db.record.findUnique({
      where: { id: recordId },
      select: {
        id: true, object: true,
      }
    });
    if (!findRecord) {
      return {
        errors: {
          _form: ["Record data was not found"]
        }
      };
    }

    const currency_data = await db.currency.findUnique({
      where: { name: data.currency },
      select: { id: true, }
    });
    const country_data = await db.country.findUnique({
      where: { name: data.country },
      select: { id: true }
    });
    const fxrateDate = await db.xRate.findUnique({
      where: { date: dayjs(data.date).format("YYYY-MM-DD"), }
    });
    let xrateId: string;
    if (!fxrateDate) {
      const response = await fetch(`https://data.fixer.io/api/${dayjs(data.date).format("YYYY-MM-DD")}?access_key=${process.env.FIXER_API_KEY}&format=1`);
      const fxrate = await response.json();

      const create = await db.xRate.create({
        data: {
          date: dayjs(data.date).format("YYYY-MM-DD"),
          base: fxrate.base,
          aud: fxrate.rates.AUD,
          jpy: fxrate.rates.JPY,
          usd: fxrate.rates.USD,
          eur: fxrate.rates.EUR,
          gbp: fxrate.rates.GBP,
          cad: fxrate.rates.CAD,
          chf: fxrate.rates.CHF,
          cny: fxrate.rates.CNY,
          hkd: fxrate.rates.HKD,
          krw: fxrate.rates.KRW,
          mxn: fxrate.rates.MXN,
          nzd: fxrate.rates.NZD,
          sgd: fxrate.rates.SGD,
        }
      });

      xrateId = create.id;
    } else {
      xrateId = fxrateDate.id;
    }

    await db.items.deleteMany({
      where: { recordId }
    });

    let totalCost: number = 0;
    for (const { item, category, subcategory, amount, cost } of data.items) {
      const findCategory = await db.category.findUnique({
        where: { name: category.name }, select: { id: true },
      });
      if (!findCategory) return { errors: { items: ["Missing category"] } };
      let subId: string | null = null;
      if (subcategory) {
        const findSub = await db.subCategory.findUnique({
          where: { name: subcategory.name }, select: { id: true },
        });
        if (!findSub) {
          const newSub = await db.subCategory.create({
            data: {
              categoryId: findCategory.id,
              name: subcategory.name
            }
          });
          subId = newSub.id;
        } else subId = findSub.id;
      }

      totalCost += cost;

      try {
        await db.items.create({
          data: {
            item, categoryId: findCategory.id, subcategoryId: !!subId ? subId : null, amount, cost, recordId: recordId,
          }
        });
      } catch (err: unknown) {
        if (err instanceof Error) {
          return {
            errors: { _form: [err.message] }
          }
        } else {
          return {
            errors: { _form: ["Something wrong"] }
          }
        }
      }
    }

    await db.record.update({
      where: { id: recordId, userId: session.user.id },
      data: {
        date: data.date.getTime(),
        dateString: dayjs(data.date).format("YYYY-MM-DD"),
        dateCalendar: generateDateFormat(data.date),
        currencyId: currency_data?.id, countryId: country_data?.id, xrateId: xrateId,
        comment: data.comment, payment_method: data.payment, regular_num: data.regular_num, regular_unit: data.regular_unit,
        isSubmitted: isSubmitted, totalcost: totalCost,
      }
    });

    if (isSubmitted) {
      revalidatePath(paths.recordsListsAppliedPageUrl());
      redirect(paths.recordsListsAppliedPageUrl());
    }
    revalidatePath(paths.recordsListsProcessingPageUrl());
    redirect(paths.recordsListsProcessingPageUrl());
    
    return { errors: {} };

  } else if (type === "income") { // income
    console.log("Visit income")
    const validateFields = EditIncomeSchema.safeParse({
      date: date, currency: currency, resource: formData.get("resource"), country: country,
      comment: formData.get("comment"), regular_unit, regular_num: Number(formData.get("regular_num")),
      income: Number(formData.get("income_amount")), category: formData.get("income_category"),
      status,
      // object:,
    });

    if (!validateFields.success) {
      return {
        errors: validateFields.error.flatten().fieldErrors,
      }
    }

    const data = validateFields.data;

    const findRecord = await db.record.findUnique({
      where: { id: recordId },
      select: {
        id: true, object: true,
      }
    });
    if (!findRecord) {
      return {
        errors: {
          _form: ["Record data was not found"]
        }
      };
    }

    const currency_data = await db.currency.findUnique({
      where: { name: data.currency },
      select: { id: true, }
    });
    const country_data = await db.country.findUnique({
      where: { name: data.country },
      select: { id: true }
    });
    const fxrateDate = await db.xRate.findUnique({
      where: { date: dayjs(data.date).format("YYYY-MM-DD"), }
    });
    let xrateId: string;
    if (!fxrateDate) {
      const response = await fetch(`https://data.fixer.io/api/${dayjs(data.date).format("YYYY-MM-DD")}?access_key=${process.env.FIXER_API_KEY}&format=1`);
      const fxrate = await response.json();

      const create = await db.xRate.create({
        data: {
          date: dayjs(data.date).format("YYYY-MM-DD"),
          base: fxrate.base,
          aud: fxrate.rates.AUD,
          jpy: fxrate.rates.JPY,
          usd: fxrate.rates.USD,
          eur: fxrate.rates.EUR,
          gbp: fxrate.rates.GBP,
          cad: fxrate.rates.CAD,
          chf: fxrate.rates.CHF,
          cny: fxrate.rates.CNY,
          hkd: fxrate.rates.HKD,
          krw: fxrate.rates.KRW,
          mxn: fxrate.rates.MXN,
          nzd: fxrate.rates.NZD,
          sgd: fxrate.rates.SGD,
        }
      });

      xrateId = create.id;
    } else {
      xrateId = fxrateDate.id;
    }

    const findResource = await db.incomeResource.findUnique({
      where: { name: data.resource }, select: { id: true },
    });
    if (!findResource) {
      return {
        errors: { resource: ["Missing resource"] }
      }
    }
    let catId: string | null = null;
    if (data.category) {
      const findCat = await db.incomeCategory.findUnique({
        where: { name: data.category }, select: { id: true },
      });
      if (!findCat) {
        const createCat = await db.incomeCategory.create({
          data: { name: data.category, resourceId: findResource.id }
        });
        catId = createCat.id
      } else catId = findCat.id;
    }

    await db.record.update({
      where: { id: recordId, userId: session.user.id },
      data: {
        date: data.date.getTime(),
        dateString: dayjs(data.date).format("YYYY-MM-DD"),
        dateCalendar: generateDateFormat(data.date),
        currencyId: currency_data?.id, countryId: country_data?.id, xrateId: xrateId,
        comment: data.comment, regular_num: data.regular_num, regular_unit: data.regular_unit,
        isSubmitted: isSubmitted, resourceId: findResource.id, income_categoryId: catId, income_amount: data.income, income_status: data.status,
        // object:  
      }
    });

    if (isSubmitted) {
      revalidatePath(paths.recordsListsAppliedPageUrl());
      redirect(paths.recordsListsAppliedPageUrl());
    }
    revalidatePath(paths.recordsListsProcessingPageUrl());
    redirect(paths.recordsListsProcessingPageUrl());

    return {
      errors: {}
    };
  }

  return { errors: {} };
}