export default async function ResetPasswordConfirmPage() {
    return (
        <div className='flex items-center justify-center h-full'>
            <div className='sm:w-[480px] w-full sm:rounded-ms sm:px-5 sm:py-3 px-3 py-2 bg-white flex flex-col items-center'>
                <h2 className='text-xl font-[700] text-slate-800'>
                    Confirmation is sent!
                </h2>
                <p className='text-base font-[500] text-slate-800 sm:mt-3 mt-8'>
                    Confirmation email is sent to your email address. Check your email box soon before the verification token gets invalid!
                </p>
            </div>
        </div>
    )
}