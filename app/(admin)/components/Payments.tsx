"use client"
import { PaymentsChart } from "@/app/components/Charts/PaymentsChart";

type paymentsType = {
    date: string; claim: string; subscription: string
}[]


const PaymentsGraph = ({ payments }: { payments: paymentsType }) => {

    return (
        <PaymentsChart chartdata={payments} />
    );
}

export default PaymentsGraph;