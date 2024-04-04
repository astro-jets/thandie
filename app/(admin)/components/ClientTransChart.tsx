"use client"
import { TransactionsChart } from "@/app/components/Charts/TransactionsChart";


type transType = {
    date: string; claim: string; subscription: string
}[]

const transactionsData = {
    data: [
        {
            date: 'Jan',
            'Claims': 2,
            'Subscriptions': 2,
        },
        {
            date: 'Feb',
            'Claims': 0,
            'Subscriptions': 4,
        },
        {
            date: 'Mar',
            'Claims': 0,
            'Subscriptions': 4
        },
        {
            date: 'Apr',
            'Claims': 1,
            'Subscriptions': 2,
        },
        {
            date: 'May',
            'Claims': 0,
            'Subscriptions': 2
        },
        {
            date: 'Jun',
            'Claims': 5,
            'Subscriptions': 5
        },
    ],
}
const ClientTransChart = ({ transactions }: { transactions: transType }) => {
    return (<TransactionsChart chartdata={transactions} />);
}

export default ClientTransChart;