export const currencyTypeString = (currencyType: string) => {
    const icon = ((currencyType === "USD" || currencyType === "AUD") ? "$" : currencyType === "JPY" ? "¥" : "€");
    return {
        currency: icon
    }
}