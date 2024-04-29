"use client"
import { BsArrow90DegRight, BsExclamationCircle, BsPlusCircle, BsTrash2, BsXCircle } from "react-icons/bs";

import { newclaim } from "@/app/actions/claims";
import SucessModal from "@/app/components/SuccessModal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import RadioComponent from "./radio";

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
type formDataTypes = {
    user: string,
    subscription: string,
    title: string,
    description: string,
    date: string,
    location: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    file: File | null
}
const initialData: formDataTypes = {
    user: '', subscription: '', title: '', description: '',
    date: '',
    location: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    file: null
}

const ClaimsComponent = ({ claims, subscriptions }: { claims: claimProps, subscriptions: subscriptionProps }) => {
    const [modalMessage, setModalMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [showFrom, setShowForm] = useState(false);
    const [formData, setFormData] = useState<formDataTypes>(initialData)
    const [file, setFile] = useState<File>();
    const [isChecked, setIsChecked] = useState('');
    const router = useRouter();
    const { data: session, status } = useSession();

    if (!session?.user) { return }

    const handleSubmit = async () => {
        console.log(formData)
        if (!file) { return }
        const data = new FormData();
        data.append('file', file);
        data.append('user', session.user.id);
        data.append('subscription', formData.subscription);
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('date', formData.date);
        data.append('location', formData.location);
        data.append('lastName', formData.lastName);
        data.append('firstName', formData.firstName);
        data.append('email', formData.email);
        data.append('phone', formData.phone);

        console.log(data)

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
                <div className="relative z-50 w-full" >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                    <div className="relative -left-40 -top-80 inset-0 z-10 w-screen  overflow-y-auto">
                        <div className="w-screen flex  min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <div className="w-[80%] min-h-[80vh] bg-white transform overflow-y-auto rounded-lg  text-left shadow-xl transition-all space-y-4 py-4">
                                <p className="text-primary-500 text-lg font-bold text-center">Add a new claim</p>
                                <div className="close-btn absolute top-0 right-2 cursor-pointer" onClick={() => { setShowForm(!showFrom) }}>
                                    <BsXCircle size={25} color={'orange'} />
                                </div>
                                <form className="w-full \ px-4 space-y-9 flex flex-col items-center">
                                    {/* Claim Details */}
                                    <div className="w-full flex-col flex space-y-4">
                                        <p className="text-primary-500 font-bold">Claim details</p>
                                        <div className="flex justify-between w-full">
                                            <div className="flex-col flex w-[48%]">
                                                <label htmlFor="">Claim Title</label>
                                                <input
                                                    type="text" name="title" placeholder="The title of your claim"
                                                    className="py-3 px-4 block w-full border-gray-200 border-[1px] rounded-lg text-sm focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none"
                                                    value={formData.title}
                                                    onChange={(e) => {
                                                        setFormData({
                                                            ...formData,
                                                            title: e.target.value
                                                        })
                                                    }}
                                                />
                                            </div>
                                            <div className="flex-col flex w-[48%]">
                                                <label htmlFor="">Policy Number</label>
                                                <input
                                                    type="text" name="title" placeholder="Witness' last name"
                                                    className="py-3 px-4 block w-full border-gray-200 border-[1px] rounded-lg text-sm focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex justify-between w-full">
                                            <div className="flex-col flex w-[48%]">
                                                <label htmlFor="">Incident Date</label>
                                                <input
                                                    type="date" name="incidentDate"
                                                    className="py-3 px-4 block w-full border-gray-200 border-[1px] rounded-lg text-sm focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none"
                                                    value={formData.date}
                                                    onChange={(e) => {
                                                        setFormData({
                                                            ...formData,
                                                            date: e.target.value
                                                        })
                                                    }}
                                                />
                                            </div>

                                            <div className="flex-col flex w-[48%]">
                                                <label htmlFor="">Incident Location</label>
                                                <input
                                                    type="text" name="location" placeholder="Location of incident"
                                                    className="py-3 px-4 block w-full border-gray-200 border-[1px] rounded-lg text-sm focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none"
                                                    value={formData.location}
                                                    onChange={(e) => {
                                                        setFormData({
                                                            ...formData,
                                                            location: e.target.value
                                                        })
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>


                                    <div className="w-full space-y-5">
                                        <div className="w-full flex flex-col items-center justify-start space-y-4 ">
                                            <h1 className="text-primary-500 font-bold text-start self-start">Select your subscription</h1>
                                            <div className="w-full flex space-x-7 items-center justify-start">
                                                {
                                                    subscriptions.services.map((service, index) => (
                                                        <div>
                                                            <label htmlFor={service._id} className="flex cursor-pointer select-none items-center">
                                                                <div className="relative">
                                                                    <input
                                                                        type="checkbox"
                                                                        id={service._id}
                                                                        className="sr-only"
                                                                        value={service._id}
                                                                        onChange={(e) => {
                                                                            setIsChecked(service._id);
                                                                            handleClick(e);
                                                                        }}
                                                                    />
                                                                    <div
                                                                        className={`box mr-4 flex h-5 w-5 items-center justify-center rounded-full border border-primary-700 ${isChecked === service._id && "!border-4"}`}
                                                                    >
                                                                        <span className="h-2.5 w-2.5 rounded-full bg-white dark:bg-transparent"></span>
                                                                    </div>
                                                                </div>
                                                                {service.name}
                                                            </label>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>

                                        <div className="flex justify-between w-full">
                                            <div className="w-full flex justify-between items-center self-start mt-4 max-w-[66%]">
                                                <label htmlFor="hs-textarea-with-corner-hint" className="text-start self-start block">Detailed Description</label>
                                                <span className="block text-sm text-gray-500">max 4000 characters</span>
                                            </div>
                                            <div className="w-full flex justify-between items-center self-end mt-4 max-w-[30%]">
                                                <label htmlFor="hs-textarea-with-corner-hint" className="text-start self-start block">Evidence Image</label>
                                            </div>
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
                                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload Evidence</span> or drag and drop</p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400"> PNG or JPG (MAX. 800x400px)</p>
                                                    </div>
                                                    <input id="dropzone-file" type="file" className="hidden" onChange={(e) => { setFile(e.target.files?.[0]) }} />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Claim Details End*/}

                                    {/* Witness details */}
                                    <div className="w-full flex-col flex space-y-4">
                                        <p className="text-primary-500 font-bold">Witness details</p>
                                        <div className="flex justify-between w-full">
                                            <div className="flex-col flex w-[48%]">
                                                <label htmlFor="">Witness first name</label>
                                                <input
                                                    type="text" name="firstName" placeholder="witness' first Name"
                                                    className="py-3 px-4 block w-full  border-gray-200 border-[1px] rounded-lg text-sm focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none"
                                                    value={formData.firstName}
                                                    onChange={(e) => {
                                                        setFormData({
                                                            ...formData,
                                                            firstName: e.target.value
                                                        })
                                                    }}
                                                />
                                            </div>
                                            <div className="flex-col flex w-[48%]">
                                                <label htmlFor="">Witness last name</label>
                                                <input
                                                    type="text" name="lastName" placeholder="Witness' last name"
                                                    className="py-3 px-4 block w-full border-gray-200 border-[1px] rounded-lg text-sm focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none"
                                                    value={formData.lastName}
                                                    onChange={(e) => {
                                                        setFormData({
                                                            ...formData,
                                                            lastName: e.target.value
                                                        })
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex justify-between w-full">
                                            <div className="flex-col flex w-[48%]">
                                                <label htmlFor="">Witness Phone number</label>
                                                <input
                                                    type="text" name="phone" placeholder="Witness' phone number"
                                                    className="py-3 px-4 block w-full border-gray-200 border-[1px] rounded-lg text-sm focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none"
                                                    value={formData.phone}
                                                    onChange={(e) => {
                                                        setFormData({
                                                            ...formData,
                                                            phone: e.target.value
                                                        })
                                                    }}
                                                />
                                            </div>

                                            <div className="flex-col flex w-[48%]">
                                                <label htmlFor="">Witness email address</label>
                                                <input
                                                    type="email" name="email" placeholder="Address"
                                                    className="py-3 px-4 block w-full border-gray-200 border-[1px] rounded-lg text-sm focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none"
                                                    value={formData.email}
                                                    onChange={(e) => {
                                                        setFormData({
                                                            ...formData,
                                                            email: e.target.value
                                                        })
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {/* Witness details end*/}
                                    {/* <select className="py-3 px-4 pe-9 block w-full border-gray-200 border-[1px] rounded-lg text-sm focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none"
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
                                    </select> */}

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