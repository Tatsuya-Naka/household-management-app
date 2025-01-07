"use client";

interface CurrencyIconProps {
    currencyType: string;
};

export default function CurrencyIcon({currencyType}: CurrencyIconProps) {
    const icon = ((currencyType === "USD" || currencyType === "AUD") ? "$" : currencyType === "JPY" ? "¥" : "€");
    return icon;
}