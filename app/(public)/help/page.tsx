import Link from 'next/link';
import React from 'react'
import { BsHeadset } from 'react-icons/bs';

const HelpPage = () => {
    ; // Assuming primary is set to blue-500

    return (
        <div className="container mx-auto px-4 py-40">
            <h1 className={`text-3xl font-bold space-x-4 mb-8 flex text-primary-600`}>
                <span>Help Center</span>
                <BsHeadset color='orange' size={40} />
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className={`card p-4 rounded-lg shadow-md text-primary-600`}>
                    <h2 className="text-xl font-semibold mb-2 text-dark">Subscribing to services</h2>
                    <p className="text-[#4b4b4b]">
                        To subscribe to a service, simply visit our Services page and select the service that best suits your needs. Once you've chosen a service, click the "Sibscribe" button and follow the on-screen instructions. You can pay for your service online using a debit or credit card.
                    </p>
                    <p className="text-[#4b4b4b]">
                        If you have any questions about enrolling in a course, please don't hesitate to contact us at +265 88 088 088 08 or email us at
                        <span className='text-primary-600'> info@directinsurance.com</span>
                    </p>
                </div>
                <div className={`card p-4 rounded-lg shadow-md text-primary-600`}>
                    <h2 className="text-xl font-semibold mb-2 text-dark">Fileing Claims</h2>
                    <p className="text-[#4b4b4b]">
                        Once you're subscribed to a service, you can file a claim online through the customer portal.
                        You'll need to create an account if you haven't already done so. Once logged in, you can view your claims and add new claims.
                    </p>
                </div>
                <div className={`card p-4 rounded-lg shadow-md text-primary-600`}>
                    <h2 className="text-xl font-semibold mb-2 text-dark">Payment Options</h2>
                    <p className="text-[#4b4b4b]">
                        We accept all major credit and debit cards for online payments. You can also pay for your course or lessons in person at our driving school office.
                    </p>
                    <p className="text-[#4b4b4b]">
                        We offer installment plans for some of our courses. If you're interested in learning more about our financing options, please contact our office.
                    </p>
                </div>
                <div className={`card p-4 rounded-lg shadow-md text-primary-600`}>
                    <h2 className="text-xl font-semibold mb-2 text-dark">Cancellation Policy</h2>
                    <p className="text-[#4b4b4b]">
                        We understand that things come up, so we allow you to cancel your course enrollment or driving lessons with at least 24 hours notice without penalty. If you cancel with less than 24 hours notice, you may be subject to a cancellation fee.
                    </p>
                    <p className="text-[#4b4b4b]">
                        For more information about our cancellation policy, please refer to our <Link className='text-primary-500' href={'/tcs'}>Terms and Conditions</Link>.
                    </p>
                </div>
            </div>

            <div className="text-center mt-8 flex flex-col items-center justify-center space-y-4">
                <p className="text-gray-500">Still have questions? Contact our friendly staff today!</p>
                <a href="/contats" className={`bg-primary-600 text-white p-4 rounded-lg`}>Contact Us</a>
            </div>
        </div>
    )
}

export default HelpPage
