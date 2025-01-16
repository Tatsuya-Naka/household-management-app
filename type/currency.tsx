"use client";
import { US, EU, JP, AU } from 'country-flag-icons/react/3x2'

interface CurrencyIconProps {
    currencyType: string;
};

export default function CurrencyIcon({currencyType}: CurrencyIconProps) {
    const icon = ((currencyType === "USD" || currencyType === "AUD") ? "$" : currencyType === "JPY" ? "¥" : "€");
    return icon;
}

export const getIcons = (name: string) => {
        switch (name) {
            case "AUD":
            case "Australia":
                return <AU style={{ width: "32px", height: "24px", marginRight: "2px" }} />;
            case "JPY":
            case "Japan":
                return <JP style={{ width: "32px", height: "24px", marginRight: "2px" }} />;
            case "USD":
            case "US":
                return <US style={{ width: "32px", height: "24px", marginRight: "2px" }} />;
            case "EUR":
            case "Europe":
                return <EU style={{ width: "32px", height: "24px", marginRight: "2px" }} />;
            default:
                return null;
        }
    };

export const currencies = ["AUD", "JPY", "USD", "EUR"];

