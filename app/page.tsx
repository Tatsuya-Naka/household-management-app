import Link from "next/link";
import SavingsIcon from '@mui/icons-material/Savings';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import SportsBaseballOutlinedIcon from '@mui/icons-material/SportsBaseballOutlined';
// import dataImage1 from "../../public/data1.png";
import { Poppins } from "next/font/google";
import paths from "@/paths";
import { cn } from "@/lib/utils";
import { Metadata } from "next";

// const font_app_name = Jaro({
//   weight: "400",
//   style: ["normal"],
//   subsets: ["latin"],
// });

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'HAB - Household Account Boook Online',
    description: 'Manage your houhold financial status with robust security',
    openGraph: {
      title: 'HAB - Household Account Boook Online',
      description: 'Manage your houhold financial status with robust security',
      url: 'https://household-management-app.vercel.app/',
      images: [
        {
          url: '/hima_pajamas.png',
          width: 800,
          height: 600,
          alt: 'image himachan'
        }
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'HAB - Household Account Book Online',
      description: 'Manage your houhold financial status with robust security',
      images: ['/hima_pajamas.png']
    }
  }
}

const font_normal = Poppins({
  weight: ["500"],
  subsets: ["latin"],
})

export default function Default() {
  return (
    <div>
      <header className="min-h-screen bg-gradient-to-r from-slate-300 to-slate-500">
        <div className="max-w-screen-xl flex-col items-center xl:mx-auto mx-5">
          {/* nav */}
          <nav className="w-full flex items-center justify-between py-2">
            {/* Logo, name, sub, vol*/}
            <div className="flex items-center">
              <SavingsIcon sx={{ fontSize: 32, color: "white", marginRight: "1rem" }} />
              <h1 className={cn("italic text-2xl font-[700] text-white mr-8")}>
                HAB
              </h1>
              <h3 className={cn("sm:inline-block hidden text-base tracking-wide text-white font-[500] bg-black bg-opacity-20 rounded-xl px-2 py-1.5 font-mano", font_normal.className)}>
                With your everyday life
              </h3>
            </div>

            {/* Loging, signin, color mode, share, sns(my github account) */}
            <div className={cn("flex items-center font-mono", font_normal.className)}>
              <Link
                href={paths.logInUrl()}
                className="mr-2 sm:text-base text-sm bg-transparent hover:underline underline-offset-4 text-white font-[700] transition duration-300 ease-in-out rounded-lg px-2 py-1 cursor-pointer"
              >
                Login
              </Link>
              <Link
                href={paths.signInUrl()}
                className="bg-white sm:text-base text-sm hover:bg-opacity-80 text-slate-500 font-[700] hover:underline hover:underline-offset-4 transition duration-300 ease-in-out sm:rounded-lg rounded-md sm:px-2 px-1 sm:py-1 py-0.5 cursor-pointer"
              >
                Signup
              </Link>
              <div className="bg-white w-0.5 h-[20px] mx-4 md:inline-block hidden" />
              <div className="md:inline-block hidden bg-transparent mr-2 cursor-pointer hover:bg-white group rounded-full p-2 transition-all duration-300 ease-in-out">
                <WbSunnyOutlinedIcon className="text-white group-hover:text-slate-500 " />
              </div>
              <button className="md:inline-block hidden bg-transparent mr-2 cursor-pointer hover:bg-white group rounded-full p-2 transition-all duration-300 ease-in-out">
                <IosShareOutlinedIcon className="text-white group-hover:text-slate-500 " />
              </button>
              <Link href="https://github.com/Tatsuya-Naka" target="_blank" className="md:inline-block hidden bg-transparent cursor-pointer hover:bg-white group rounded-full p-2 transition-all duration-300 ease-in-out">
                <SportsBaseballOutlinedIcon className="text-white group-hover:text-slate-500 " />
              </Link>
            </div>
          </nav>

          {/* Header content */}
          <div className="bg-no-repeat bg-contain h-[220px]">
            {/* <Image 
                src={dataImage1}
                alt="App description"
                height={2000}
                width={2000}
                className="float-left max-h-[calc(100vh-50px)] max-w-[50%]"
              /> */}
            <div className="float-right">
              <div className="flex items-center justify-center">
                <h1 className="">

                </h1>
                <h3 className="">

                </h3>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="bg-shinchan">
        Thank you
      </main>
      <footer >

      </footer>
    </div>
  );
}
