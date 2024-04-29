import { getclaims } from "@/app/actions/claims";
import Link from "next/link";
import { BsArrow90DegUp, BsExclamationCircle, BsTrash } from "react-icons/bs";
export const dynamic = "force-dynamic"

type claimProps = {
    claimsData: {
        _id: string;
        title: string;
        status: string;
        description: string;
        date: string,
        location: string,
        witnessName: string,
        witnessEmail: string,
        witnessPhone: string,
        service: {
            name: string; description: string;
        },
        user: {
            name: string; email: string;
        }
    }[]
}
const ClaimsAdmin = async () => {
    const data: claimProps = await getclaims();
    const claims = data.claimsData.filter(d => d.status == 'pending')

    return (
        <>
            <h1>Claims Admin</h1>
            <div className="flex flex-col mt-10">
                <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className="overflow-hidden">
                            {
                                claims.length ?
                                    <table className="min-w-full divide-y divide-gray-200 ">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Claim Title</th>
                                                <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Claim Description</th>
                                                <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Service Name</th>
                                                <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">User Details</th>
                                                <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 ">
                                            {

                                                claims?.map(claim => (
                                                    <tr className="hover:bg-gray-100 ">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ">{claim.title}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 "> {claim.description}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 "> {claim.service.name}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 flex flex-col ">
                                                            <p>Name: {claim.user.name}</p>
                                                            <p>Email: {claim.user.email}</p>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium ">
                                                            <Link href={`/admin/claims/${claim._id}`} type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-red-600 p-3 hover:scale-125 transition-all cursor-pointer disabled:opacity-50 disabled:pointer-events-none">
                                                                <BsArrow90DegUp color={'red'} size={20} />
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                    :
                                    <h1 className="text-primary-500 px-3 h-10 w-[45%] bg-primary-300 rounded-lg shadow-lg shadow-gray-400 flex items-center space-x-3">
                                        <span>There are no claims at the moment</span>
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