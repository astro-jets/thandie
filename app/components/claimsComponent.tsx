"use client"
import { BsArrow90DegRight, BsExclamationCircle, BsPlusCircle, BsTrash2, BsXCircle } from "react-icons/bs";

import { newclaim } from "@/app/actions/claims";
import SucessModal from "@/app/components/SuccessModal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

type claimProps = {
    _id: string;
    title: string;
    description: string;
    status: string;
    service: {
        _id: string,
        name: string,
        price: string,
        list: string[],
    };
}[];
type subscriptionProps = {
    services: {
        _id: string,
        name: string;
        description: string;
        list: string[];
    }[];
};
type formDataTypes = { user: string, subscription: string, title: string, description: string, file: File | null }
const initialData: formDataTypes = { user: '', subscription: '', title: '', description: '', file: null }

const ClaimsComponent = ({ claims, subscriptions }: { claims: claimProps, subscriptions: subscriptionProps }) => {
    const [modalMessage, setModalMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [showFrom, setShowForm] = useState(false);
    const [formData, setFormData] = useState<formDataTypes>(initialData)
    const [file, setFile] = useState<File>();
    const router = useRouter();
    const { data: session, status } = useSession();

    // const handleSubmit = async () => {
    //     if (!file) { return }
    //     formData.file = file;
    //     formData.user = session?.user.id!;
    //     const res = await newclaim(formData);
    //     if (res) {
    //         setModalMessage(res.message)
    //         setSuccess(true)
    //     }
    //     setShowForm(!showFrom);
    // }

    const handleSubmit = async () => {
        if (!file) { return }
        const data = new FormData();
        data.append('file', file);
        data.append('user', session?.user.id!);
        data.append('subscription', formData.subscription);
        data.append('title', formData.title);
        data.append('description', formData.description);
        const res = await fetch(`http://localhost:3000/api/claims/new`, {
            method: "POST",
            body: data
        });
        const result = await res.json();
        if (result) {
            setModalMessage(result.message)
            setSuccess(true)
        }
        setShowForm(!showFrom);
    }



    const handleClick = (e: any) => {
        setFormData({
            ...formData,
            subscription: e.target.value
        })
    }
    console.log("Claims => ", claims)
    return (
        <>
            {claims ?
                <>
                    <button className="bg-primary-500 text-white p-2 rounded-lg shadow-lg mb-8 flex space-x-2 items-center "
                        onClick={() => { setShowForm(!showFrom) }}
                    >
                        <p>add a new claim</p>
                        <BsPlusCircle size={20} color={'#fff'} />
                    </button>
                    <div className="grid w-full sm:grid-cols-2 xl:grid-cols-4 gap-6">
                        {
                            claims?.map(claim =>

                                <div className="flex flex-col bg-white  shadow-gray-300 shadow-lg rounded-xl">
                                    {/* <img className="w-full h-auto rounded-t-xl" src="https://images.unsplash.com/photo-1680868543815-b8666dba60f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2532&q=80" alt="Image Description" /> */}
                                    <div className="p-4 md:p-5">
                                        <h3 className="text-lg font-bold text-gray-800">
                                            {claim.title}
                                        </h3>
                                        <p className="mt-1 text-gray-500">
                                            {claim.description}...
                                        </p>
                                        <p className={`mt-5 font-bold text-xs text-primary-700`}>
                                            Claim status: {claim.status}
                                        </p>
                                        <Link href={`/claims/${claim._id}`} className="border-primary-700 border-[1px] rounded-lg mt-5 p-2 w-1/4 flex items-center space-x-2">
                                            <BsArrow90DegRight size={20} color={'orange'} />
                                        </Link>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </>
                :
                <div className="w-full mt-10  flex items-center justify-center">
                    <div className="w-1/2 h-[50vh] rounded-3xl flex flex-col justify-center items-center space-y-20 bg-white shadow-primary-500 shadow-lg">
                        <div className="flex space-x-4 items-center">
                            <h1 className="font-bold text-2xl">You have no claims</h1>
                            <BsExclamationCircle color={'orange'} size={40} />
                        </div>
                        <button className="w-1/2 flex items-center justify-center space-x-4 py-3 px-1 bg-primary-500 rounded-lg text-white shadow-gray-300 shadow-lg"
                            onClick={() => { setShowForm(!showFrom) }}>
                            <p className="text-md text-white font-semibold">New claim</p>
                            <BsPlusCircle color={'#fff'} size={20} />
                        </button>
                    </div>
                </div>
            }

            {showFrom &&
                <div className="relative z-50 w-full" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                    <div className="fixed inset-0 z-10 w-screen  overflow-y-auto">
                        <div className="w-screen flex  min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <div className="w-3/5 h-[80vh] bg-white transform overflow-hidden rounded-lg  text-left shadow-xl transition-all space-y-4 py-4">
                                <p className="text-primary-500 text-lg font-bold text-center">Add a new claim</p>
                                <div className="close-btn absolute top-0 right-2 cursor-pointer" onClick={() => { setShowForm(!showFrom) }}>
                                    <BsXCircle size={25} color={'orange'} />
                                </div>
                                <form className="w-full h-80 px-4 space-y-3 flex flex-col items-center">
                                    <input
                                        type="text" name="title" placeholder="Claim Title"
                                        className="py-3 px-4 block w-full border-gray-200 border-[1px] rounded-lg text-sm focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none"
                                        value={formData.title}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                title: e.target.value
                                            })
                                        }}
                                    />
                                    <select className="py-3 px-4 pe-9 block w-full border-gray-200 border-[1px] rounded-lg text-sm focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none"
                                        onChange={(e) => { handleClick(e) }}
                                    >
                                        <option selected>Select claimable subscription</option>
                                        {
                                            subscriptions.services.map((service, index) => (
                                                <option key={index} value={service._id}>
                                                    {service.name}
                                                </option>
                                            ))
                                        }
                                    </select>

                                    <div className="w-full flex justify-between items-center mt-4">
                                        <label htmlFor="hs-textarea-with-corner-hint" className="block text-sm font-medium">Message</label>
                                        <span className="block text-sm text-gray-500">100 characters</span>
                                    </div>

                                    <div className="w-full flex justify-between">
                                        <textarea id="hs-textarea-with-corner-hint" className="py-3 px-4 block w-[66%] shadow-lg border-gray-200 border-[1px] rounded-lg text-sm focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="An explanation of the claim you are issuing."
                                            value={formData.description}
                                            onChange={(e) => {
                                                setFormData({
                                                    ...formData,
                                                    description: e.target.value
                                                })
                                            }}
                                        ></textarea>

                                        <div className="flex items-center justify-center w-[30%]">
                                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-60 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100">
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                    </svg>
                                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400"> PNG or JPG (MAX. 800x400px)</p>
                                                </div>
                                                <input id="dropzone-file" type="file" className="hidden" onChange={(e) => { setFile(e.target.files?.[0]) }} />
                                            </label>
                                        </div>
                                    </div>

                                    <button type="button" className="bg-primary-500 rounded-lg p-3 w-3/4 text-white" onClick={(e) => { handleSubmit() }}>Submit</button>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            }
            {
                success &&
                <SucessModal
                    url=""
                    onClose={() => {
                        setSuccess(false)
                        router.refresh()
                    }}
                    isOpen={success}
                    title="Claim Submitted"
                    message={modalMessage}
                />
            }
        </>
    );
}

export default ClaimsComponent;