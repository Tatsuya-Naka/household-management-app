'use client';

export default function AccountCoponent() {
  // TODO: click button then show pop up screen to confirm the action
  return (
    <div className="w-full h-full shadow-md rounded-lg">
      <div className="px-5 py-5 relative flex flex-col gap-5">
        <div className="w-full h-full flex justify-start">
          <h2 className="text-2xl font-bold">Account Setting</h2>
        </div>
        <div className="flex flex-col gap-3 h-full">
          <div className="w-full rounded-lg bg-emerald-500/20">
            <p className="px-4 py-2 text-lg font-[500] text-emerald-500">
              Delete your account by clicking the button below.
            </p>
          </div>
          <div className="w-full text-center">
            <button type="button" className="rounded-lg hover:bg-sky-500 transition duration-150 delay-75 bg-sky-500/50 px-4 py-2 text-lg font-[700] text-white">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
