import EditRecordsComponent from "@/components/edit/records/edit-records";
import { db } from "@/lib/db";
import { Metadata } from "next";
import { Suspense } from "react";

interface EditRecordsPageProps {
  params: Promise<{
    recordId: string;
  }>
}

export const metadata: Metadata = {
  title: "HMB - Household Management App | Record Page",
  description: "Manage your money with your everyday life",
};

export const generateMetadata = async ({ params }: EditRecordsPageProps): Promise<Metadata> => {
  const { recordId } = await params;
  const data = await db.record.findUnique({ where: { id: recordId } });
  const openGraph = {
    title: "HEB - healthy financial management app",
    description: `testing - ${data?.comment}`,
    url: `https://household-management-app.vercel.app/edit/records/${recordId}`,
    images: [{url: `${data?.object ? data.object : "https://household-management-bucket.s3.ap-southeast-2.amazonaws.com/icon/cm4p59ynp0000z4ngvd05ehpo"}`, width: 800, height: 600, alt: "image"}],
    type: "website"
  }

  return {
    title: "HEB application | Tatsuya",
    description: `dev - ${data?.comment}`,
    openGraph: openGraph,
    twitter: {
      card: "summary_large_image",
      title: `HEB`,
      description: `twitter - ${data?.typeId}`,
      images: [`${data?.object} || https://household-management-bucket.s3.ap-southeast-2.amazonaws.com/icon/cm4p59ynp0000z4ngvd05ehpo`]
    }
  }
}

export default async function EditRecordsPage({ params }: EditRecordsPageProps) {
  const { recordId } = await params;

  return (
    <Suspense>
      <EditRecordsComponent recordId={recordId} />
    </Suspense>
  )
}