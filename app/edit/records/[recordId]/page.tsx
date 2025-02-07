import { auth } from "@/auth";
import EditRecordsComponent from "@/components/edit/records/edit-records";
import { getRecordData } from "@/data/records";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface EditRecordsPageProps {
    params: Promise<{
        recordId: string;
    }>
}

export async function generateMetaData({ params }: EditRecordsPageProps): Promise<Metadata> {
    const { recordId } = await params;
    const session = await auth();
    if (!session || !session.user) {
        return notFound();
    }
    try {
        const data = await getRecordData({ recordId, userId: session.user.id });
        const { record } = data;
        const title = "HMB - Household Management App"
        const description = "Manage your money with your everyday life";
        const url = `https://household-management-app.vercel.app/records/${recordId}`;
        const openGraph = {
            title,
            description,
            url,
            images: [{url: 'https://household-management-bucket.s3.ap-southeast-2.amazonaws.com/icon/cm4p59ynp0000z4ngvd05ehpo', width: 800, height: 600, alt: "image icon"}],
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
    } catch (err: unknown) {
        return notFound();
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