"use client"
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { signIn } from "next-auth/react";
// Components
import ErrorModal from "../../components/ErrorModal";
import Link from "next/link";

const Signup = () => {
    const [modalStatus, setModalStatus] = useState(false);
    const [modalMsg, setModalMsg] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter()

    const handleSubmit = async (formData: FormData) => {
        if (!formData) { return }
        if (!email || !password) {
            setModalMsg("All credentials must be provided.")
            setModalStatus(true)
            return;
        }
        try {
            const res = await signIn("credentials", { email, password, redirect: false })
            if (res?.ok) {
                console.log(res)
                router.push("/admin")
            } else {
                setModalMsg("Incorrect email or password.")
                setModalStatus(true)
            }
        } catch (err) {
            setModalMsg(err as string)
            setModalStatus(true)
        }
    }

    return (
        <>
            <ErrorModal
                message={modalMsg}
                title="Could'nt sign you in!"
                isOpen={modalStatus}
                url="/"
                onClose={() => setModalStatus(false)}
            />
            <div className="w-full overflow-hidden  bg-primary-400 flex items-center justify-center min-h-screen relative z-10">
                <Link href={'/'} className='rounded-lg shadow-lg bg-primary-700 text-white py-2 px-3 absolute top-3 left-3 transition hover:scale-110'>Home</Link>
                <div className="absolute -top-40 -right-40 lg:w-2/3 w-full h-80 -z-10">
                    <svg xmlns='http://www.w3.org/2000/svg' className="drop-shadow-[-20px_10px_0px_#ffc949]" viewBox='0 0 2000 2000'
                        fill='#ffb14a'>
                        <path
                            d='M994 112c-703-2-920.47 400.35-904 905 13.35 409 32.03 946.66 977 861 684-62 792-279 835-777 61.67-714.25-288.33-987.24-908-989Z'>
                        </path>
                    </svg>
                </div>
                <div className="w-full max-w-[1190px] px-6 sm:px-8 md:px-16 py-10 md:py-20 rounded-xl  min-h-[300px] m-2">

                    <div className="w-full max-w-md mx-auto p-6">
                        <div className="mt-7 border border-primary-200 rounded-xl shadow-lg bg-primary-500">
                            <div className="p-4 sm:p-7">
                                <div className="text-center">
                                    <h1 className="block text-2xl font-bold text-white">Sign In</h1>
                                    <p className="mt-2 text-sm text-white">
                                        Dont have have an account?
                                        <a className="text-white decoration-2 hover:underline font-medium" href="/signup">
                                            Sign up here
                                        </a>
                                    </p>
                                </div>

                                <div className="mt-5">
                                    <button type="button" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-primary-200 bg-[#333] text-white shadow-sm hover:bg-primary-50 disabled:opacity-50 disabled:pointer-events-none">
                                        <svg className="w-4 h-auto" width="46" height="47" viewBox="0 0 46 47" fill="none">
                                            <path d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z" fill="#4285F4" />
                                            <path d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z" fill="#34A853" />
                                            <path d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z" fill="#FBBC05" />
                                            <path d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z" fill="#EB4335" />
                                        </svg>
                                        Sign in with Google
                                    </button>

                                    <div className="py-3 flex items-center text-xs text-white uppercase before:flex-[1_1_0%] before:border-t before:border-primary-200 before:me-6 after:flex-[1_1_0%] after:border-t after:border-primary-200 after:ms-6 dark:text-white">Or</div>
                                    {/* Form */}
                                    <form action={handleSubmit} >
                                        <div className="grid gap-y-4">
                                            {/* Form Group */}
                                            <div>
                                                <label htmlFor="email" className="block text-sm mb-2 dark:text-white">Email address</label>
                                                <div className="relative">
                                                    <input
                                                        type="email" id="email" name="email"
                                                        className="py-3 px-4 block w-full border-primary-200 rounded-lg text-sm focus:border-red-500 focus:ring-red-500 disabled:opacity-50 disabled:pointer-events-none "
                                                        required aria-describedby="email-error"
                                                        onChange={(e) => {
                                                            setEmail(e.target.value)
                                                        }}
                                                        value={email}
                                                    />
                                                    <div className="hidden absolute inset-y-0 end-0  items-center pointer-events-none pe-3">
                                                        <svg className="h-5 w-5 text-white" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <p className="hidden text-xs text-white mt-2" id="email-error">Please include a valid email address so we can get back to you</p>
                                            </div>
                                            {/* End Form Group */}

                                            {/* Form Group */}
                                            <div>
                                                <div className="flex justify-between items-center">
                                                    <label htmlFor="password" className="block text-sm mb-2 dark:text-white">Password</label>
                                                    <a className="text-sm text-white decoration-2 hover:underline font-medium" href="../examples/html/recover-account.html">Forgot password?</a>
                                                </div>
                                                <div className="relative">
                                                    <input
                                                        type="password" id="password" name="password" className="py-3 px-4 block w-full border-primary-200 rounded-lg text-sm focus:border-red-500 focus:ring-red-500 disabled:opacity-50 disabled:pointer-events-none" required aria-describedby="password-error"
                                                        onChange={(e) => {
                                                            setPassword(e.target.value)
                                                        }}
                                                        value={password}
                                                    />
                                                    <div className="hidden absolute inset-y-0 end-0  items-center pointer-events-none pe-3">
                                                        <svg className="h-5 w-5 text-white" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <p className="hidden text-xs text-white mt-2" id="password-error">8+ characters required</p>
                                            </div>
                                            {/* End Form Group */}


                                            <button type="submit" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-primary-700 text-white hover:bg-red-700 disabled:opacity-50 disabled:pointer-events-none">Sign In</button>
                                        </div>
                                    </form>
                                    {/* End Form */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Signup;