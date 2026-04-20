import { PageBaseUi } from '@repo/ui/PageBaseUi'
import React from 'react'
import { PageTopBar } from '../../../components/PageTopBar'

const loading = () => {

    const p2pTxnCols = [
        { key: "txn_id", label: "Transaction Id" },
        { key: "amount", label: "Amount" },
        { key: "txn_status", label: "Status" },
        { key: "txn_type", label: "Type" },
        { key: "start_time", label: "Created At" },
        { key: "end_time", label: "Completed At" },
        { key: "sender", label: "Sender" },
        { key: "receiver", label: "Receiver" },
    ]

    return (
        <PageBaseUi>
            <PageTopBar title='Peer To Peer Transfer' />
            <div className='overflow-scroll scroll-smooth w-full h-full p-5'>

                {/* Top Section Skeleton */}
                <div className='flex items-stretch gap-2 mb-6'>

                    {/* PeerTransferForm Skeleton */}
                    <div className="w-2/3 rounded-xl border border-border bg-card p-6 animate-pulse">
                        <div className="flex gap-2 mb-6">
                            <div className="h-8 w-24 bg-neutral-100 rounded" />
                            <div className="h-8 w-24 bg-neutral-100 rounded" />
                        </div>

                        <div className="space-y-4">
                            <div className="h-10 w-full bg-neutral-100 rounded" />
                            <div className="h-10 w-full bg-neutral-100 rounded" />
                            <div className="flex gap-2">
                                <div className="h-8 w-16 bg-neutral-100 rounded" />
                                <div className="h-8 w-16 bg-neutral-100 rounded" />
                                <div className="h-8 w-16 bg-neutral-100 rounded" />
                            </div>
                            <div className="h-10 w-40 bg-neutral-100 rounded mt-4" />
                        </div>
                    </div>

                    {/* QuickPayments Skeleton */}
                    <div className="w-1/3 rounded-lg border border-border bg-card p-6 animate-pulse">
                        <div className="mb-3">
                            <div className="h-5 w-40 bg-muted rounded mb-2" />
                        </div>

                        <div className="flex justify-evenly mb-6">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-20 h-20 bg-neutral-100 animate-pulse rounded-xl" />
                            ))}
                        </div>

                        <div className="space-y-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex justify-between items-center">
                                    <div className="flex gap-2 items-center">
                                        <div className="w-10 h-10 bg-neutral-100 animate-pulse rounded-full" />
                                        <div>
                                            <div className="h-3 w-24 bg-neutral-100 animate-pulse rounded mb-1" />
                                            <div className="h-3 w-32 bg-neutral-100 animate-pulse rounded" />
                                        </div>
                                    </div>
                                    <div className="w-8 h-8 bg-neutral-100 animate-pulse rounded" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Transactions Table Skeleton */}
                <table className="w-full rounded-md border overflow-scroll h-[44%] ">
                    <thead className='h-[38px] sticky top-0 border-b-2 overflow-auto border-b-neutral-200 bg-neutral-100 w-full'>
                        <tr className='text-left'>
                            {p2pTxnCols?.map((c) => (
                                <th key={c.label} className="text-sm font-normal px-3 py-2 text-center">
                                    {c.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: 11 }).map((_, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className="border-b-[1px] border-neutral-100"
                            >
                                {Array.from({ length: 8 }).map((_, colIndex) => (
                                    <td key={colIndex} >
                                        <div
                                            className="h-[28px] w-[120px] my-2 mx-auto bg-neutral-100 rounded-md "
                                            style={{
                                                animation: "pulse 1.5s ease-in-out infinite",
                                            }}
                                        ></div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>


            </div>
        </PageBaseUi>
    )
}

export default loading