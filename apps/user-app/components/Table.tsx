'use client';
import React, { useState } from 'react'
import { motion } from "motion/react"
import { THead } from "@repo/ui/THead"
import { TBody } from "@repo/ui/TBody"
import { IconChevronDown } from '@tabler/icons-react';

type TableProps = {
    txn_data: any[],
    columns: {
        key: string,
        label: string
    }[];

}

export const Table = ({ columns, txn_data }: TableProps) => {
    const [hoveredTxnId, setHoveredTxnId] = useState<string | null>(null)
    const bankLogos = {
        hdfc: "/hdfc.png",
        icici: "/icici.png"
    }
    const getStatusColor = (status: string) => {
        const currStatus = status?.toLowerCase()
        if (currStatus === "success") {
            return "bg-[#d6f5ef] border-[#143c30] text-[#143c30]"
        } else {
            return "bg-[#fddde2] border-[#68432d] text-[#68432d]"
        }
    }

    const convertModernDate = (txnDate: string) => {

        if (!txnDate) return "";
        const date = new Date(txnDate);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric'
        }).replace(',', '')

    }
    return (
        <table className='w-full'>
            <THead header={columns.map(c => c.label)} />
            <TBody body={txn_data} columns={columns} >
                {
                    txn_data.map((row: any) => (
                        <tr key={row?.txn_id} className='border-b hover:bg-neutral-50'>
                            {columns.map(col => (
                                <td key={col.key as string} className={`px-3 py-2 ${col.key === "txn_id" && "w-[28rem]"}`}>
                                    {
                                        col.key === "txn_id" &&
                                        <div className='relative'>
                                            <motion.div
                                                onHoverStart={() => setHoveredTxnId(row.txn_id)}
                                                onHoverEnd={() => setHoveredTxnId(null)}

                                                className='border-2 relative rounded-xl p-2 lg:max-w-[320px] overflow-hidden text-sm hover:bg-black hover:bg-opacity-10 cursor-pointer'>
                                                {row[col.key]?.length > 30 ?
                                                    <span className='flex gap-2 items-center justify-between'>
                                                        {row[col.key]?.slice(0, 30)}... <IconChevronDown size={16} />
                                                    </span>
                                                    : row[col.key]}
                                            </motion.div>

                                            {
                                                hoveredTxnId === row.txn_id &&
                                                <motion.div
                                                    initial={{ y: 4, opacity: 0 }}
                                                    animate={{ y: 0, opacity: 1 }}
                                                    exit={{ y: 4, opacity: 0 }}
                                                    transition={{ duration: 0.2, ease: "easeIn" }}
                                                    className='absolute border-2 bg-white rounded-md top-11 px-2 py-1 text-base z-30 '>
                                                    {row[col.key]}
                                                </motion.div>
                                            }

                                        </div>
                                    }
                                    {(col.key === "start_time" || col.key === "end_time") &&
                                        <div className='flex flex-col justify-center items-start'>
                                            <span className='text-sm'>{convertModernDate(row[col.key]?.date)}</span>
                                            <span className='text-xs text-black text-opacity-50'>{row[col.key]?.time}</span>
                                        </div>
                                    }
                                    {
                                        col.key === "provider" && (
                                            <div className="flex items-center gap-1">
                                                <img
                                                    src={bankLogos[row[col.key]?.toLowerCase() as keyof typeof bankLogos]}
                                                    alt="bank logo"
                                                    className=" w-6 h-6"
                                                />
                                                <span className="text-sm">{row[col.key]}</span>
                                            </div>
                                        )
                                    }
                                    {col.key === "txn_status"
                                        ? <div className={`rounded-2xl min-w-[80px] w-max py-[0.4rem] text-center text-[0.8rem] font-medium border-none ${getStatusColor(row.txn_status)}`}>{row[col.key]}</div>
                                        : (col.key !== "start_time" && col.key !== "end_time" && col.key !== "provider" && col.key !== "txn_id") ? row[col.key] : null
                                    }
                                </td>
                            ))}
                        </tr>
                    ))
                }
            </TBody>
        </table>
    )
}