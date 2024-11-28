import SignInFormEmail from "@/components/auth/signin-form-email";

export default async function SignInEmailPage() {
    return (
        <div className="bg-white m-0 p-0 min-h-screen">
            <div className={`w-full bg-shinchan bg-cover bg-no-repeat min-h-screen flex items-center justify-center relative`}>
                <div className='max-w-[680px] bg-white sm:rounded-xl shadow-xl sm:mx-auto mx-0 sm:relative absolute top-0 right-0 left-0 h-full bg-opacity-80'>
                    <div className='sm:px-10 sm:py-8 px-3 py-2 flex flex-col items-center justify-center h-full w-full'>
                        <div className='flex items-center justify-between w-full sm:p-0 px-2 py-3'>
                            <h3 className='sm:text-xl text-start sm:mx-0 mx-auto text-lg font-[700] text-zinc-700'>
                                Register - User Information
                            </h3>
                        </div>

                        <SignInFormEmail />
                    </div>
                </div>
            </div>
        </div>
    )
}