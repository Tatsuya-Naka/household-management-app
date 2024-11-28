"use client";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import Link from 'next/link';
import paths from '@/paths';
import { FcGoogle } from "react-icons/fc";
import { FaXTwitter } from "react-icons/fa6";
import { FaApple } from "react-icons/fa";
import SignInButton from './signin-button';
// import { signIn } from "next-auth/react";
// import { DEFAULT_SIGNIN_REDIRECT } from '@/route';

export default function SignInForm() {
    const getIcon = (id: string) => {
        switch (id) {
            case "google":
                return <FcGoogle size={32} className='mr-2' />
            case "twitter":
                return <FaXTwitter size={32} className='mr-2' />
            case "apple":
                return <FaApple size={32} className='mr-2' />
            default:
                return null;
        }
    };

    const onClick = (provider: "google" | "twitter" | "apple") => {
        console.log(provider);
        // TODO: Signin With OAuth Provider Google, Twitter, and Apple
        // signIn(provider, {
        //     callbackUrl: DEFAULT_SIGNIN_REDIRECT,
        // })
    }

    return (
        <div className="flex flex-col items-center justify-center  bg-white shadow-xl rounded-lg sm:mx-auto sm:my-auto sm:min-w-[480px] mx-0 py-5 px-5">
            <h3 className="text-xl font-[700] text-zinc-700 mb-2">
                Signin
            </h3>
            <div className='h-[1px] bg-gray-200 w-full my-2' />
            <div className="w-full">
                <div className="px-2 py-3 flex-col items-center gap-2">
                    <ul className="">
                        <li className="mb-4">
                            <Link href={paths.signInEmailUrl()} className="hover:bg-gray-100 w-full bg-transparent border-[1px] shadow-lg border-solid border-zinc-700 rounded-lg px-2 py-1.5 flex items-center">
                                <EmailOutlinedIcon sx={{ fontSize: 32 }} className='text-zinc-700 mr-2' />
                                <span className='text-center mx-auto'>Signin with Email</span>
                            </Link>
                        </li>
                        <li className="mb-4">
                            <SignInButton onClick={() => onClick("google")}>
                                {getIcon("google")}
                                <span className='text-center mx-auto'>Signin with Google</span>
                            </SignInButton>
                        </li>
                        <li className="mb-4">
                            <SignInButton onClick={() => onClick("twitter")}>
                                {getIcon("twitter")}
                                <span className='text-center mx-auto'>Signin with X (Twitter)</span>
                            </SignInButton>
                        </li>
                        <li className="">
                            <SignInButton onClick={() => onClick("apple")}>
                                {getIcon("apple")}
                                <span className='text-center mx-auto'>Signin with Apple</span>
                            </SignInButton>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='h-[1px] bg-gray-200 w-full my-2' />
            <div className='my-10'>
                <Link
                    href={paths.logInUrl()}
                    className='text-zinc-700 text-base font-[500] underline underline-offset-4 hover:text-teal-400'
                >
                    Login Page
                </Link>
            </div>
        </div>
    )
}