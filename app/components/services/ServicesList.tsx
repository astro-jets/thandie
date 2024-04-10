"use client"

import { useState } from "react";
import Paywall from "../Paywall";

type serviceProps = {
    _id: string;
    name: string;
    price: string;
    list: string[];
};
type servicesProps = {
    _id: string;
    name: string;
    price: string;
    list: string[];
}[];

const initialService: serviceProps = {
    _id: '',
    name: '',
    price: '',
    list: [],
}

const ServicesList = ({ services }: { services: servicesProps }) => {
    const [showPaywall, setShowPaywall] = useState(false);
    const [selectedService, setSelectedService] = useState<serviceProps>(initialService);

    return (
        <>
            {
                showPaywall && <Paywall service={selectedService} onClose={() => { setShowPaywall(false) }} />
            }
            <div className="w-full  bg-primary-400 flex items-center justify-center min-h-screen relative z-10">
                <div className="absolute -top-40 -right-40 lg:w-2/3 w-full h-80 -z-10">
                    <svg xmlns='http://www.w3.org/2000/svg' className="drop-shadow-[-20px_10px_0px_#ffc949]" viewBox='0 0 2000 2000'
                        fill='#ffb14a'>
                        <path
                            d='M994 112c-703-2-920.47 400.35-904 905 13.35 409 32.03 946.66 977 861 684-62 792-279 835-777 61.67-714.25-288.33-987.24-908-989Z'>
                        </path>
                    </svg>
                </div>

                <div
                    className="w-full max-w-[1190px] px-6 sm:px-8 md:px-16 py-10 md:py-20 rounded-xl bg-[#ffffff]/60 min-h-[300px] m-2 shadow-[0px_14px_28px_-5px_rgba(0,0,0,0.21)]">
                    <h1 className="font-semibold text-2xl mb-2 tracking-wider drop-shadow-[3px_3px_5px_rgba(91,91,91,0.58)]">Affordable Insurance cover</h1>
                    <small className="font-[500]">In the event that we do not have a full 30-days, we extrapolate based on data we have.</small>

                    <ul className="flex items-start justify-between gap-8 mt-10 md:flex-row flex-col">
                        {
                            services?.length ? (
                                services?.map(service => (
                                    <li key={service._id}
                                        className="w-full lg:w-[32%] px-10 pt-16 pb-8 bg-white rounded-lg self-stretch hover:scale-105 hover:shadow-[0px_14px_28px_-5px_rgba(0,0,0,0.1)] transition-all duration-150 ease-in">
                                        <h2 className="text-center text-black font-semibold text-lg tracking-wider mb-3 drop-shadow-[3px_3px_5px_rgba(91,91,91,0.58)]">
                                            {service.name}
                                        </h2>
                                        <p className="text-center tracking-tighter block mb-14">
                                            <span className="text-4xl font-bold">K{service.price}</span>
                                            <span className="text-black/40 text-center">/mo</span>
                                        </p>
                                        <button className="w-full p-2 bg-[#13181f] text-white rounded-md font-semibold hover:bg-primary-500 transition-all duration-150 ease-in mb-8 border-[#13181f]"
                                            onClick={() => {
                                                setSelectedService(service)
                                                setShowPaywall(!showPaywall)
                                            }}
                                        >
                                            subscribe
                                        </button>

                                        <ol className="list-disc text-primary-500 w-[80%] mx-auto">
                                            {
                                                service?.list?.map(item => (
                                                    <li><span className="text-black text-xs font-semibold">{item}</span></li>
                                                ))
                                            }
                                        </ol>
                                    </li>
                                ))) : <h1>OK Nothing here</h1>
                        }
                    </ul>
                </div>
            </div>
        </>
    );
}

export default ServicesList;