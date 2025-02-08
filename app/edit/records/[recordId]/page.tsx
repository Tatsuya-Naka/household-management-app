// import { auth } from "@/auth";
import EditRecordsComponent from "@/components/edit/records/edit-records";
import { Suspense } from "react";

interface EditRecordsPageProps {
  params: Promise<{
    recordId: string;
  }>
}

export default async function EditRecordsPage({ params }: EditRecordsPageProps) {
  const { recordId } = await params;

  return (
    <Suspense>
      <EditRecordsComponent recordId={recordId} />
    </Suspense>
  )
}