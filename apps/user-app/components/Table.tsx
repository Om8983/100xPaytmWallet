'use client';
import React from 'react'
import { THead } from "@repo/ui/THead"
import { TBody } from "@repo/ui/TBody"
export const Table = () => {
    const header = ["Amount", "Txn_Id", "Txn_Status", "Start Time", "End Time"]
    const dummyRampingData = Array.from({ length: 30 }, (_, i) => ({
        amount: `₹${(i + 1) * 100}`,
        txnId: `TXN${String(100000 + i)}`,
        status:
            i % 3 === 0 ? "Success" : i % 3 === 1 ? "Pending" : "Failed",
        startTime: `10:${String(i % 60).padStart(2, "0")} AM`,
        endTime:
            i % 3 === 1
                ? "-"
                : `10:${String((i + 2) % 60).padStart(2, "0")} AM`,
    }));
    return (
        <table className='w-full'>
            <THead header={header} />
            <TBody body={dummyRampingData} />
        </table>
    )
}