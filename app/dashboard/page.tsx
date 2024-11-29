import { auth, signOut } from "@/auth"

export default async function DashboardPage() {
    const session = await auth();
    return (
        <div>
            Dashboard Page
            <div>
                {JSON.stringify(session)}
            </div>

            <form action={async() => {
                "use server";
                await signOut();
            }}>
                <button type="submit"
                    className="bg-black hover:bg-black/50 text-white rounded-md py-2 px-3 text-base"
                >   
                    SignOut
                </button>
            </form>
        </div>
    )
}