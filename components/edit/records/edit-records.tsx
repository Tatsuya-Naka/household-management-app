import { auth } from "@/auth";
import { getRecordData } from "@/data/records";
import EditRecordEntrance from "./client-entrance";

interface EditRecordsComponentProps {
    recordId: string;
};

export default async function EditRecordsComponent({recordId}: EditRecordsComponentProps) {
    const session = await auth();
    const data = await getRecordData({recordId, userId: session?.user.id});

    return (
        <div className="w-full">
           <EditRecordEntrance session={session} record={data.record}  />
        </div>
    )
}