import Link from 'next/link';
import paths from '@/paths';
import Hima from "../../public/hima.png";
import Shinchan from "../../public/kawaii_shinchan.png";
import Image from 'next/image';
import LogInForm from '@/components/auth/login-form';

export default async function LoginPage() {
    return (
        <div className="max-w-screen-xl mx-auto px-4 flex flex-col items-center justify-center min-h-[calc(100vh-56px)]">
            <div className='flex flex-col sm:flex-row items-center justify-center gap-6'>
                <Image
                    src={Hima}
                    alt='Hima'
                    height={2000}
                    width={2000}
                    className='w-[200px] sm:w-[250px] lg:w-[380px] hidden sm:block shrink-0'
                    priority
                />

                <LogInForm />

                <Image
                    src={Shinchan}
                    alt='Shinchan'
                    height={2000}
                    width={2000}
                    className='w-[200px] sm:w-[250px] lg:w-[380px] hidden sm:block shrink-0'
                    priority
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