import { getAdminSubscriptions } from "@/app/actions/action";
import { BsExclamationCircle } from "react-icons/bs";
export const dynamic = "force-dynamic"

type subProps = {
    data: {
        name: string;
        subscriptions: string;
        payments: string;
    }[]
}
const ClaimsAdmin = async () => {
    const res: subProps = await getAdminSubscriptions();
    const subscriptions = res.data;
    return (
        <>
            <h1>Subscriptions</h1>
            <div className="flex flex-col mt-10">
                <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className="overflow-hidden">
                            {
                                subscriptions.length ?
                                    <table className="min-w-full divide-y divide-gray-200 ">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Service Name</th>
                                                <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Subscriptions</th>
                                                <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Payments</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 ">
                                            {

                                                subscriptions?.map(sub => (
                                                    <tr className="hover:bg-gray-100 ">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ">{sub.name}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 "> {sub.subscriptions}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 "> K {sub.payments.toLocaleString()}</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                    :
                                    <h1 className="text-primary-500 px-3 h-10 w-[45%] bg-primary-300 rounded-lg shadow-lg shadow-gray-400 flex items-center space-x-3">
                                        <span>There are no subscriptions at the moment</span>
                                        <BsExclamationCircle color={'orange'} size={20} />
                                    </h1>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ClaimsAdmin;