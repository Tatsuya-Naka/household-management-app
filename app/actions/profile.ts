"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import paths from "@/paths";
import ProfileSchema from "@/schemas/profile";
import { s3_post } from "@/server/s3";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface ProfileState {
  errors: {
    name?: string[];
    currency?: string[];
    location?: string[];
    icon?: string[];
    _form?: string[];
  },
  success?: {
    isSuccess: boolean;
    message: string;
  }
}

interface UpdateProfileProps {
  type: string;
  local: string;
}

export async function updateProfile({ type, local }: UpdateProfileProps, formState: ProfileState, formData: FormData): Promise<ProfileState> {
  "use server";
  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ["Invalid Access"]
      }
    }
  }

  const validatedFields = ProfileSchema.safeParse({
    name: formData.get("name"),
    currency: type,
    location: local,
    icon: formData.get("icon"),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { name, currency, location, icon } = validatedFields.data!;
  // TODO: upload icon to s3
  let iconUrl = "";
  if (icon && icon.size > 0) {
    const { success } = await s3_post({ file: icon, name: "icon" });
    if (success && success.isSuccess) {
      iconUrl = success.url;
    }
  }

  try {
    await db.user.update({
      where: { id: session.user.id },
      data: {
        name: name,
        currency: currency,
        location: location,
        image: iconUrl,
      }
    })
  } catch (error) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message]
        }
      }
    } else {
      return {
        errors: {
          _form: ["An unknown error occurred"]
        }
      }
    }
  }

  revalidatePath(paths.settingPageUrl());
  redirect(paths.settingPageUrl());
}