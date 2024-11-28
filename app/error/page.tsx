import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

export default async function ErrorPage() {
    return (
        <div className="sm:w-[480px] w-full rounded-lg bg-white shadow-lg flex flex-col items-center space-y-6 py-3 px-3">
            <h2 className="text-xl text-slate-800 font-[700]">
                Invalid Page
            </h2>
            <div className="flex items-center gap-2 text-base text-slate-800 font-[500]">
                <ReportGmailerrorredIcon />
                <span>Ops, something went wrong 404</span>
            </div>
        </div>
    )
}