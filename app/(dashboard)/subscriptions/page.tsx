import { getSubscriptions } from "@/app/actions/subcriptions";
import { options } from "@/app/api/auth/[...nextauth]/options";
import ServicesComponent from "@/app/components/services/Services";
import { getServerSession } from "next-auth";

type subscriptionsProps = {
    services: {
        name: string;
        price: string;
        list: string[];
    }[];
};
const Subscriptions = async () => {
    const session = await getServerSession(options);
    if (!session) { return }

    const subscriptions: subscriptionsProps = await getSubscriptions(session.user.id);
    console.log("Subscriptions => ", subscriptions)
    return (
        <div className="w-full h-full flex flex-col space-y-4">
            <div className="w-full flex flex-between justify-between">
                <h1 className=" text-primary-500 font-bold text-lg">Subscriptions</h1>
            </div>


            {
                subscriptions ?
                    <div className="grid w-full sm:grid-cols-2 xl:grid-cols-4 gap-6">
                        {
                            subscriptions.services.map(subscription =>

                                <div className="flex flex-col bg-white  shadow-gray-300 shadow-lg rounded-xl">
                                    <div className="p-4 md:p-5">
                                        <h3 className="text-lg font-bold text-gray-800">
                                            {subscription.name}
                                        </h3>
                                        <p className="mb-3 text-primary-700">
                                            Cost: K{subscription.price}/month
                                        </p>

                                        {
                                            subscription.list.map(item => (
                                                <li className="list-disc text-gray-700">{item}</li>
                                            ))
                                        }

                                        {/* <button className="bg-primary-700 text-white rounded-lg mt-5 p-3 w-full">unsubscribe</button> */}

                                    </div>
                                </div>
                            )
                        }
                    </div>
                    :
                    <ServicesComponent />
            }


        </div>
    );
}

export default Subscriptions;