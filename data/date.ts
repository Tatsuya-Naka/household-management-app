interface generateDateFormat {
    date: Date;
}

export const generateDateFormat = (date: Date): string => {
    const day = date.getDate();
    const month = date.toLocaleString("en-US", {month: "short"});
    const suffix = 
        day === 1 || day === 21 || day === 31 ? "st" :
        day === 2 || day === 22 ? "nd" :
        day === 3 || day === 23 ? "rd" : "th";

    return `${month} ${day}${suffix}`;
}