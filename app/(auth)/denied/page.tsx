import Link from "next/link";

const Denied = () => {
    return (
        <div className="w-full overflow-hidden  bg-primary-400 flex items-center justify-center min-h-screen relative z-10">
            <div className="absolute -top-40 -right-40 lg:w-2/3 w-full h-80 -z-10">
                <svg xmlns='http://www.w3.org/2000/svg' className="drop-shadow-[-20px_10px_0px_#ffc949]" viewBox='0 0 2000 2000'
                    fill='#ffb14a'>
                    <path
                        d='M994 112c-703-2-920.47 400.35-904 905 13.35 409 32.03 946.66 977 861 684-62 792-279 835-777 61.67-714.25-288.33-987.24-908-989Z'>
                    </path>
                </svg>
            </div>
            <div className="w-full max-w-[1190px] px-6 sm:px-8 md:px-16 py-10 md:py-20 rounded-xl  min-h-[300px] m-2 shadow-[0px_14px_28px_-5px_rgba(0,0,0,0.21)]">
                <div className="grid min-h-full place-items-center  px-6 py-24 sm:py-32 lg:px-8">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-white">500</p>
                        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Access Denied!</h1>
                        <p className="mt-6 text-base leading-7 text-gray-900">Sorry, only adminstrators can access this page.</p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link href="/" className="rounded-md w-[70%] bg-primary-600 px-3.5 py-3 text-sm font-bold text-white shadow-xl hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600">Go back home</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Denied;