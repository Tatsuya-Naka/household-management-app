import { auth } from "@/auth";
import { getRecordData } from "@/data/records";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface EditRecordsPageProps {
  params: Promise<{
    recordId: string;
  }>
}

export async function generateMetadata({ params }: EditRecordsPageProps): Promise<Metadata> {
  const { recordId } = await params;
  const session = await auth();
  if (!session || !session.user) {
    return notFound();
  }
  const data = await getRecordData({ recordId, userId: session.user.id });
  const { record } = data;
  const title = "HMB"
  const description = `${record?.genre || "OOkini"}`;
  const url = `https://household-management-app.vercel.app/records/${recordId}`;
  const openGraph = {
    title,
    description,
    url,
    images: [{ url: `${(record && record.object) ? record.object : "https://household-management-bucket.s3.ap-southeast-2.amazonaws.com/icon/cm4p59ynp0000z4ngvd05ehpo"}`, width: 800, height: 600, alt: "image icon" }],
    type: "website"
  };

  return {
    title,
    description,
    openGraph: openGraph,
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`'https://household-management-bucket.s3.ap-southeast-2.amazonaws.com/icon/cm4p59ynp0000z4ngvd05ehpo'`],
    }
  }
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