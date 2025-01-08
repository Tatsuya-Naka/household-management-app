interface RecordEditPageProps {
    params: Promise<{
        recordId: string;
    }>;
}

export default async function RecordEditPage({ params }: RecordEditPageProps) {
    const { recordId } = await params;

    return (
        <div>
            Wow
            <p>RecordId: {recordId}</p>
        </div>
    );
}
