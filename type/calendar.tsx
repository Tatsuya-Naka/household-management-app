import dayjs, { Dayjs } from "dayjs";
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { styled } from '@mui/material/styles';
import isSameOrAfterPlugin from 'dayjs/plugin/isSameOrAfter';
import isSameOrBeforePlugin from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrAfterPlugin);  // Extend dayjs with the plugin
dayjs.extend(isSameOrBeforePlugin);

interface CustomPickerDayProps extends PickersDayProps<Dayjs> {
    isSelected: boolean;
}

const CustomPickersDay = styled(PickersDay, {
    shouldForwardProp: (prop) => prop !== 'isSelected' && prop !== 'isHovered',
})<CustomPickerDayProps>(({ theme, isSelected, day }) => ({
    borderRadius: 0,
    ...(isSelected && {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        '&:hover, &:focus': {
            backgroundColor: theme.palette.primary.main,
        },
    }),
    ...(day.day() === 0 && {
        borderTopLeftRadius: '50%',
        borderBottomLeftRadius: '50%',
    }),
    ...(day.day() === 6 && {
        borderTopRightRadius: '50%',
        borderBottomRightRadius: '50%',
    }),
})) as React.ComponentType<CustomPickerDayProps>;

const isInRange = (day: Dayjs, from: Dayjs | null | undefined, to: Dayjs | null | undefined) => {
    return day.isSameOrAfter(from, "day") && day.isSameOrBefore(to, "day");
};

export function Day(
    props: PickersDayProps<Dayjs> & {
        selectedDay?: Dayjs | null;
        hoveredDay?: Dayjs | null;
    },
) {
    const { day, selectedDay, hoveredDay, ...other } = props;

    return (
        <CustomPickersDay
            {...other}
            day={day}
            sx={{ px: 2.5 }}
            disableMargin
            selected={false}
            isSelected={isInRange(day, selectedDay, hoveredDay)}
        />
    );
};

export type CalendarFixingType = {
    id: string;
    incomeresource?: { name: string },
    incomecategory?: { name: string },
    income_amount?: number,
    object?: string,
    income_status?: boolean,
    dateString: string,
    dateCalendar: string,
    currency: { name: string },
};

export type CalendarFixingExpensesType = {
    id: string;
    genre: string;
    Items: { item: string; cost: number; };
    totalcost: number;
    object?: string,
    dateString: string,
    dateCalendar: string,
    currency: { name: string },
};

export type CalendarFixingSavingsIncomeType = {
    id: string;
    incomeresource: { name: string },
    incomecategory: { name: string },
    income_amount: number,
    dateString: string,
    dateCalendar: string,
    currency: { name: string },
};


export type CalendarFixingSavingsExpensesType = {
    id: string;
    genre: string;
    Items: { cost: number; category: { name: string }; subcategory: { name: string } }[];
    totalcost: number;
    dateString: string,
    dateCalendar: string,
    currency: { name: string },
};


export type CalendarGraphType = {
    date: string;
    amount: number;
    dayOfWeek: string;
    label: string;
}

export type CalendarExpensesGraphType = {
    date: string;
    costs: number;
    dayOfWeek: string;
    label: string;
}

export type CalendarSavingsGraphType = {
    date: string;
    savings: number;
    dayOfWeek: string;
    label: string;
}


export type CalendarGraphCombineType = {
    dateCurr: string;
    currAmount: number;
    datePrev: string;
    prevAmount: number;
    label: string;
}

export type CalendarExpensesGraphCombineType = {
    dateCurr: string;
    currCosts: number;
    datePrev: string;
    prevCosts: number;
    label: string;
}

export type CalendarSavingsGraphCombineType = {
    dateCurr: string;
    currSavings: number;
    datePrev: string;
    prevSavings: number;
    label: string;
}

export type CalendarIncomeGroupResourceType = {
    resource: string;
    rate: number;
};

export type CalendarIncomeGroupCategoryType = {
    resource: string;
    categories: {
        category: string;
        rate: number;
    }[];
};

export type CalendarIncomeGroupType = {
    resource: CalendarIncomeGroupResourceType[];
    category: CalendarIncomeGroupCategoryType[];
}

export type CalendarExpensesCategoryType = {
    category: string;
    rate: number;
};

export type CalendarExpensesSubGroupType = {
    category: string;
    subcategories: {
        subcategory: string;
        rate: number;
    }[];
};

export type CalendarExpensesGroupType = {
    category: CalendarExpensesCategoryType[];
    sub_category: CalendarExpensesSubGroupType[];
}