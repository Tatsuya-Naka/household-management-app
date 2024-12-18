import Link from 'next/link';
import paths from '@/paths';
import Hima from "../../public/hima.png";
import Shinchan from "../../public/kawaii_shinchan.png";
import Image from 'next/image';
import LogInForm from '@/components/auth/login-form';

export default async function LoginPage() {
    return (
        <div className="max-w-screen-xl lg:mx-auto md:mx-5 mx-0 my-0 flex flex-col items-center justify-center min-h-[calc(100vh-56px)]">
            <div className='flex items-center justify-center'>

                <Image
                    src={Hima}
                    alt='Hima'
                    height={2000}
                    width={2000}
                    className='lg:w-[380px] sm:w-[250px] sm:inline-block hidden shrink-0'
                />

                {/* Login form */}
                <LogInForm />

                <Image
                    src={Shinchan}
                    alt='Shinchan'
                    height={2000}
                    width={2000}
                    className='lg:w-[380px] sm:w-[250px] sm:inline-block hidden shrink-0'
                />
            </div>

            <div className='mt-10'>
                <Link
                    href={paths.signInUrl()}
                    className='text-zinc-700 text-base font-[500] underline underline-offset-4 hover:text-teal-400'
                >
                    Signin Page
                </Link>
            </div>
        </div>
    )
}