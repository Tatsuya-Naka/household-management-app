import paths from "@/paths";
import Image from "next/image";
import Link from "next/link";
import shinchan from "@/public/shinchan_pajamas.png";

export default async function ResetPasswordSuccessPage() {
    return (
        <div className="sm:w-[480px] w-full bg-white shadow-xl rounded-lg py-8 px-5 relative overflow-hidden">
            <div className="flex flex-col relative z-10">
                <h2 className="text-xl font-[700] text-slate-800 mb-7">
                    Success!!
                </h2>
                <p className="text-lg font-[500] text-slate-[800]">
                    You successfully reset your password.
                </p>
                <div className="space-x-1">
                    <p className="text-lg font-[500] text-slate-[800] inline-block">
                        Now,
                    </p>
                    <Link href={paths.logInUrl()}
                        className="hover:underline hover:underline-offset-4 cursor-pointer"
                    >
                        you can visit the login and click!
                    </Link>
                </div>
            </div>
            <div className="absolute top-0 right-1 left-auto ">
                <Image 
                    src={shinchan}
                    alt="Shinchan"
                    width={200}
                    height={200}
                    className="object-contain"
                />
            </div>
        </div>
    )
}