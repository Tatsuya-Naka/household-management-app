import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// LINE??
// export const metadata: Metadata = {
//   title: "HMB - Household Management App | wow",
//   description: "Manage your money with your everyday life",
// };

export const metadata: Metadata = {
  title: 'HAB - Household Account Book Online',
  description: 'Manage your household financial status with robust security',
  openGraph: {
    title: 'HAB - Household Account Book Online',
    description: 'Manage your household financial status with robust security',
    url: 'https://household-management-app.vercel.app/',
    images: [
      {
        url: '/hima_pajamas.png',
        width: 800,
        height: 600,
        alt: 'image himachan'
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HAB - Household Account Book Online',
    description: 'Manage your household financial status with robust security',
    images: ['/hima_pajamas.png']
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
