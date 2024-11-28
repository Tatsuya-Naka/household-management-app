"use client";
import { FcGoogle } from "react-icons/fc";
import { FaXTwitter } from "react-icons/fa6";
import { FaApple } from "react-icons/fa";
import * as actions from "../../app/actions";
import LogInFormStatus from "./login-form-status";
// import { signIn } from "next-auth/react";
// import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { Suspense, useActionState } from "react";

export default function LogInForm() {
    const [formState, action] = useActionState(actions.login, { errors: {} });

    const onClick = (provider: "google" | "twitter" | "apple") => {
        console.log(provider);
        // TODO: Activate OAuth providers: gogole, twitter, apple for signin
        // signIn(provider, {
        //     callbackUrl: DEFAULT_LOGIN_REDIRECT
        // })
    };

    return (
        <div className='rounded-lg flex items-center justify-center max-w-[480px] lg:min-w-[480px] md:min-w-[400px] w-full'>
            <div className='flex flex-col items-center w-full'>
                <h3 className='text-xl font-[700] text-zinc-700'>
                    Login
                </h3>
                <div className='h-[1px] bg-gray-200 w-full my-5' />
                <div className='flex flex-col items-center gap-2 w-full'>
                    {/* OAuth Service : Google, X, Apple */}
                    <div className='flex items-center justify-evenly w-full'>
                        <label className='flex items-center flex-col gap-1'>
                            <button className='hover:opacity-60 rounded-full bg-transparent sm:p-2.5 p-1.5 border-2 border-solid border-gray-200'
                                type="button"
                                onClick={() => onClick("google")}
                            >
                                <FcGoogle size={32} className='' />
                            </button>
                            <span className='text-sm text-zinc-700'>Google</span>
                        </label>
                        <label className='flex items-center flex-col gap-1'>
                            <button className='hover:opacity-60 rounded-full bg-transparent sm:p-2.5 p-1.5 border-2 border-solid border-gray-200'
                                type="button"
                                onClick={() => onClick("twitter")}
                            >
                                <FaXTwitter size={32} className='' />
                            </button>
                            <span className='text-sm text-zinc-700'>X (Twitter)</span>
                        </label>
                        <label className='flex items-center flex-col gap-1'>
                            <button className='hover:opacity-60 rounded-full bg-transparent sm:p-2.5 p-1.5 border-2 border-solid border-gray-200'
                                type="button"
                                onClick={() => onClick("apple")}
                            >
                                <FaApple size={32} className='' />
                            </button>
                            <span className='text-sm text-zinc-700'>Apple</span>
                        </label>
                    </div>

                    <div className='flex items-center gap-5 w-80 my-2'>
                        <div className='bg-gray-200 h-[1px] w-full' />
                        <span className='text-zinc-700 text-base font-[500]'>or</span>
                        <div className='bg-gray-200 h-[1px] w-full' />
                    </div>

                    <form className='flex flex-col gap-8 w-full' action={action}>
                        <Suspense>
                            <LogInFormStatus formState={formState} />
                        </Suspense>
                    </form>
                </div>
            </div>
        </div>
    )
}