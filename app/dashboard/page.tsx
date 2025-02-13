import DashboardContainer from "@/components/dashboard/dashboard-container";
import { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'HAB - Household Account Book Online',
  description: 'Manage your household financial status with robust security',
  openGraph: {
    title: 'HAB - Household Account Book Online',
    description: 'Manage your household financial status with robust security',
    url: 'https://household-management-app.vercel.app/',
    images: [
      {
        // url: '/hima_pajamas.png',
        url: 'https://household-management-bucket-temp.s3.ap-southeast-2.amazonaws.com/new-record/cm4p59ynp0000z4ngvd05ehpo/44d0563a-01b1-4d72-ab15-4cb91d0036b5',
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
    // images: ['/hima_pajamas.png']
    images: ['https://household-management-bucket-temp.s3.ap-southeast-2.amazonaws.com/new-record/cm4p59ynp0000z4ngvd05ehpo/44d0563a-01b1-4d72-ab15-4cb91d0036b5']
  }
  }
}

export default async function DashboardPage() {
  return (
    <div className="">
      {/* Dashboard Page */}
      <Suspense fallback={"...Loading"}>
        <DashboardContainer />
      </Suspense>
    </div>
  )
}