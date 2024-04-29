import React from 'react'

const TermsAndConditions = () => {
    return (
        <div className="container mx-auto px-4 py-40">
            <h1 className="text-3xl font-bold mb-8 text-center text-primary-600">Direct Insurance - Terms and Conditions</h1>

            <div className="prose text-gray-700">
                <p>
                    Welcome to Direct Insurance! These terms and conditions outline the rules and regulations
                    governing your use of our website .</p>

                <h2 className="text-xl font-semibold mt-4">Subscription and Payment</h2>
                <ul className="list-disc pl-4">
                    <li>To subscribe services, you must be at least 18 years old and possess a valid national ID.</li>
                    <li>Services fees must be paid in full at the time of subscriprion. We accept all major credit and debit cards.</li>
                </ul>

                <h2 className="text-xl font-semibold mt-4">Cancellations and Refunds</h2>
                <ul className="list-disc pl-4">
                    <li>No refunds will be issued for cancellations with less than 24 hours notice.</li>
                </ul>

                <h2 className="text-xl font-semibold mt-4">Disclaimer</h2>
                <p>Direct Insurance  strives to provide quality insurance cover. However, we cannot guarantee that all your claims will be met.
                    The success of your claims will depend on the nature and adherence to insurance laws.</p>

                <p className="mt-4">These Terms and Conditions are subject to change at any time. We will notify you of any material changes by posting the revised Terms on our website. Your continued use of the Service constitutes your acceptance of the revised Terms.</p>

                <p className="mt-4">If you have any questions about these Terms and Conditions, please contact us at 088 12 34 56 or info@directinsurance.com.</p>
            </div>
        </div>
    )
}

export default TermsAndConditions
