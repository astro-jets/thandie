"use client"

import { newService } from "@/app/actions/services";
import SucessModal from "@/app/components/SuccessModal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsPlusCircle, BsTrash, BsXCircle } from "react-icons/bs";

type serviceProps = {
    id: string;
    name: string;
    price: string;
    list: string[];
}[];
type formDataTypes = { list: string[], name: string, price: string }
const initialData: formDataTypes = { list: [], name: '', price: '' }

const ServicesAdminList = ({ services }: { services: serviceProps }) => {
    const [success, setSuccess] = useState(false);
    const [showFrom, setShowForm] = useState(false);
    const [formData, setFormData] = useState<formDataTypes>(initialData)
    const [service, setService] = useState('')
    const router = useRouter();

    const handleSubmit = async () => {
        console.log(formData);
        const res = await newService(formData);
        if (res) {
            setSuccess(true)
        }
        setFormData({
            list: [],
            name: '', price: ''
        })
        setShowForm(!showFrom);
    }
    const addService = async () => {
        formData.list.push(service);
        setService('');
    }

    return (
        <>
            <button className="bg-primary-500 text-white p-2 rounded-lg shadow-lg mb-8 flex space-x-2 items-center "
                onClick={() => { setShowForm(!showFrom) }}
            >
                <p>add a new service</p>
                <BsPlusCircle size={20} color={'#fff'} />
            </button>

            <div className="flex flex-col">
                <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className="overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200 ">
                                <thead>
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Service Name</th>
                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Service Cost</th>
                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Service Covers</th>
                                        <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 ">
                                    {
                                        services?.map(service => (
                                            <tr className="hover:bg-gray-100 ">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ">{service.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">K {service.price}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">
                                                    {
                                                        service.list.map(item => (
                                                            <li className="list-disc" >{item}</li>
                                                        ))
                                                    }
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium ">
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-red-600 p-3 hover:scale-125 transition-all cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                                                    >
                                                        <BsTrash color={'red'} size={20} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {showFrom &&
                <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg space-y-4 py-4">
                                <p className="text-primary-500 text-lg font-bold text-center">Add a new service</p>
                                <div className="close-btn absolute top-0 right-2 cursor-pointer" onClick={() => { setShowForm(!showFrom) }}>
                                    <BsXCircle size={25} color={'orange'} />
                                </div>
                                <form className="w-full h-80 px-4 space-y-3 flex flex-col items-center">
                                    <input
                                        type="text" name="name" placeholder="name"
                                        className="py-3 px-4 block w-full border-gray-200 border-[1px] rounded-lg text-sm focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none"
                                        value={formData.name}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                name: e.target.value
                                            })
                                        }}
                                    />

                                    <input type="text" name="price" placeholder="price"
                                        className="py-3 px-4 block w-full border-gray-200 border-[1px] rounded-lg text-sm focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none"
                                        value={formData.price}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                price: e.target.value
                                            })
                                        }}
                                    />
                                    <div className="flex justify-between items-center w-full">
                                        <input type="text" name="list" placeholder="list"
                                            className="py-3 px-4 block w-11/12 border-gray-200 border-[1px] rounded-lg text-sm focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none"
                                            value={service}
                                            onChange={(e) => {
                                                setService(e.target.value)
                                            }}
                                        />
                                        <BsPlusCircle className={'cursor-pointer'} color={'orange'} size={35} onClick={() => { addService() }} />
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
                    title="Added service"
                    message="Service added successfully"
                />
            }
        </>
    );
}

export default ServicesAdminList;