import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "HMB - Household Management App | Record",
    description: "Keep up with your purchase/income records",
  };

export default function RecordLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="en">
        <body
        >
          {children}
        </body>
      </html>
    );
  }
  