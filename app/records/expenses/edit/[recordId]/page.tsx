interface RecordEditPageProps {
    params: Promise<{
        recordId: string;
    }>;
}

export default async function RecordExpensesEditPage({ params }: RecordEditPageProps) {
    const { recordId } = await params;

    return (
        <div>
            Expenses
            <p>RecordId: {recordId}</p>
        </div>
    );
}
