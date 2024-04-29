"use client"
import React, { useState } from 'react';
import SucessModal from '../SuccessModal';
import { useRouter } from 'next/navigation';
import { deleteClaim } from '@/app/actions/claims';

type claimProps = {
    _id: string;
    title: string;
    status: string;
    description: string;
    path: string;
    location: string,
    date: string,
    witnessName: string,
    witnessEmail: string,
    witnessPhone: string,
    service: {
        name: string; description: string;
    },
    user: {
        name: string; email: string;
    }
}

const ClaimSummary = ({ claimData }: { claimData: claimProps }) => {
    const [showModal, setShowModal] = useState(false);
    const [modalMsg, setModalMsg] = useState('');
    const router = useRouter();

    const handleClose = () => {
        setShowModal(false)
        router.push('/claims')
    }

    const handleSubmit = async (status: string) => {
        const res = await deleteClaim(claimData._id, status)
        if (res) {
            setModalMsg(res.message)
            setShowModal(true)
        }
    }
    return (
        <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Claim Details</h2>
                <img
                    className="w-20 h-20 rounded-full border border-gray-400 object-cover"
                    src={`/uploads/${claimData.path}`} // Handle missing image
                    alt="Claimant Photo"
                />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="text-gray-700">Claim Title</div>
                <div className="font-medium">{claimData.title}</div>
                <div className="text-gray-700">Policy Number</div>
                <div className="font-medium">{claimData._id}</div>
                <div className="text-gray-700">Incident Date</div>
                <div className="font-medium">{claimData.date}</div>
                <div className="text-gray-700">Incident Location</div>
                <div className="font-medium">{claimData.location}</div>
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-medium mb-2 text-gray-800">Description and Evidence</h2>
                <div className="text-gray-700">{claimData.description}</div>
                <div className="mt-4">
                    <img
                        className="w-full h-auto rounded-lg shadow-md object-cover"
                        src={`/uploads/${claimData.path}`} // Handle missing image
                        alt="Evidence Image"
                    />
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-medium mb-2 text-gray-800">Witness Information</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="text-gray-700">Witness Name</div>
                    <div className="font-medium">{claimData.witnessName}</div>
                    <div className="text-gray-700">Phone Number</div>
                    <div className="font-medium">{claimData.witnessPhone}</div>
                    <div className="text-gray-700">Email Address</div>
                    <div className="font-medium">{claimData.witnessEmail}</div>
                </div>
            </div>

            <div className="flex justify-end mt-8">
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none"
                    onClick={() => { handleSubmit(claimData._id) }}
                >
                    Delete
                </button>
            </div>


            <SucessModal
                message={modalMsg}
                title={"Update Success!"}
                isOpen={showModal}
                onClose={() => { handleClose() }}
                url={''}
            />
        </div>
    );
};

export default ClaimSummary;
