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
}