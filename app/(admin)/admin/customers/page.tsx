import { getCustomers } from "@/app/actions/action";
import { BsExclamationCircle } from "react-icons/bs";
export const dynamic = "force-dynamic"

type customersProps = {
    customers: {
        name: string;
        email: string;
        createdAt: Date;
    }[]
}
const CustomersAdmin = async () => {
    const res: customersProps = await getCustomers();
    console.log("Res ==> ", res)
    const customers = res.customers;
    return (
        <>
            <h1>Customers</h1>
            <div className="flex flex-col mt-10">
                <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className="overflow-hidden">
                            {
                                customers.length ?
                                    <table className="min-w-full divide-y divide-gray-200 ">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Name</th>
                                                <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Email</th>
                                                <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Registered On</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 ">
                                            {

                                                customers?.map(customer => (
                                                    <tr className="hover:bg-gray-100 ">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ">{customer.name}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 "> {customer.email}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">
                                                            {
                                                                new Date(customer.createdAt).toLocaleDateString("en-US", {
                                                                    year: 'numeric',
                                                                    month: 'long',
                                                                    day: 'numeric',
                                                                    hour: '2-digit',
                                                                    minute: '2-digit'
                                                                })
                                                            }
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                    :
                                    <h1 className="text-primary-500 px-3 h-10 w-[45%] bg-primary-300 rounded-lg shadow-lg shadow-gray-400 flex items-center space-x-3">
                                        <span>There are no customers at the moment</span>
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

export default CustomersAdmin;