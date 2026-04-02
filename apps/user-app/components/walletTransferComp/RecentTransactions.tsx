'use client';

import { IconArrowDownLeft, IconArrowUpRight } from "@tabler/icons-react";

const getStatusColor = (status: string) => {
    switch (status) {
        case 'completed':
            return 'bg-emerald-100 text-emerald-700 border-emerald-200';
        case 'pending':
            return 'bg-amber-100 text-amber-700 border-amber-200';
        case 'failed':
            return 'bg-red-100 text-red-700 border-red-200';
        default:
            return 'bg-gray-100 text-gray-700 border-gray-200';
    }
};

const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
};

type TxnData = {
    id: string;
    amount: number;
    receiver_email: string; // could be name as well
    status: string;
    endtime: string;
    type: 'sent' | 'received'
}
type RecentTxnProps = {
    transactions?: TxnData[]
}
export const RecentTransactions = ({ transactions }: RecentTxnProps) => {

    return (
        <div className="rounded-lg border border-border bg-card p-6 h-full flex flex-col w-1/3">
            <div className="mb-6 pb-4 border-b border-border">
                <h3 className="text-lg font-semibold text-foreground">Recent Transactions</h3>
                <p className="text-xs text-muted-foreground mt-1">Last 5 transfers</p>
            </div>

            <div className="space-y-0 flex-1 divide-y divide-border">
                {
                    !transactions ?
                        <img src="/nodatafound.png" alt="no data found" className="mx-auto mt-[5rem]" width={300} height={300} />
                        :
                        transactions.map((transaction) => (
                            <div
                                key={transaction.id}
                                className="flex items-center justify-between py-4 first:pt-0 last:pb-0 hover:bg-secondary/40 px-2 -mx-2 rounded-lg transition-colors duration-150"
                            >
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                    <div
                                        className={`p-2.5 rounded-lg flex-shrink-0 transition-all duration-200 ${transaction.type === 'sent'
                                            ? 'bg-destructive/15 text-destructive'
                                            : 'bg-accent/15 text-accent'
                                            }`}
                                    >
                                        {transaction.type === 'sent' ? (
                                            <IconArrowUpRight className="h-4 w-4" color="green" />
                                        ) : (
                                            <IconArrowDownLeft className="h-4 w-4" color="red" />
                                        )}
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-semibold text-foreground truncate">
                                            {transaction.receiver_email}
                                        </p>
                                        <p className="text-xs text-muted-foreground">{transaction.endtime}</p>
                                    </div>
                                </div>

                                <div className="text-right flex-shrink-0 ml-4">
                                    <p
                                        className={`text-sm font-bold ${transaction.type === 'sent' ? 'text-foreground' : 'text-accent'
                                            }`}
                                    >
                                        {transaction.type === 'sent' ? '−' : '+'}${transaction.amount.toFixed(2)}
                                    </p>
                                    <span
                                        className={`inline-block text-xs px-2.5 py-1 rounded-full text-center mt-1 font-medium border ${getStatusColor(
                                            transaction.status
                                        )}`}
                                    >
                                        {getStatusLabel(transaction.status)}
                                    </span>
                                </div>
                            </div>
                        ))
                }
            </div>
        </div>
    );
}
