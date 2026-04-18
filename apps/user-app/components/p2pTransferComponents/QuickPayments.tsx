"use client";
import { IconCash, IconDotsVertical, IconSend } from '@tabler/icons-react'
import React, { useState } from 'react'
import { AnimatePresence, motion } from "motion/react"
import { Tooltip } from "@repo/ui/Tooltip"

export type PeerData = {
    receiver_name?: string;
    receiver_img?: string;
    receiver_email: string;
    receiver_id: string;
}
type QuickPaymentDataType = {
    data: PeerData[];
}

export const QuickPayments = ({ data }: QuickPaymentDataType) => {
    const [isSendHovered, setSendHovered] = useState<boolean>(false)

    return (
        <div className="rounded-lg border border-border bg-card p-6 lg:min-h-full flex flex-col w-1/3">
            <div className="mb-6 pb-4 border-b border-border">
                <h3 className="text-lg font-semibold text-foreground">Quick Payments</h3>
            </div>
            <div className='flex items-center justify-evenly border-b border-border mb-6 pb-4'>
                <div className='w-20 h-20 flex gap-2 p-1 flex-col justify-center items-center bg-[#d3ddf8] bg-opacity-40 rounded-xl border-[1px] '>
                    <img src="/sendMoneyIcon.svg" alt="sendMoney" className='w-8 h-8' />
                    <span className='text-xs text-center'>Send </span>
                </div>
                <div className='w-20 h-20 flex gap-2 p-1 flex-col justify-center items-center bg-[#9ec68a] bg-opacity-20 rounded-xl border-[1px] '>
                    <img src="/requestMoney.svg" alt="requestMoney" className='w-8 h-8' />
                    <span className='text-xs text-center'>Request </span>
                </div>
                <div className='w-20 h-20 flex gap-1 p-1 flex-col justify-center items-center bg-[#700fef] bg-opacity-20 rounded-xl border-[1px] '>
                    <IconCash size={36} />
                    <span className='text-xs text-center'>Top Up </span>
                </div>
                <div className='w-20 h-20 flex flex-col gap-2 p-1 justify-center items-center bg-[#dc9c80] bg-opacity-20 rounded-xl border-[1px] '>
                    <IconDotsVertical size={28} />
                    <span className='text-xs text-center'>More</span>
                </div>
            </div>
            <div className='flex flex-col justify-center gap-2'>
                {
                    (!data || data.length === 0) ?
                        <img src="/nodatafound.png" alt="no data found" className="mx-auto mt-[5rem]" width={300} height={300} />
                        :
                        data?.map((user) => (
                            <div className='relative flex items-center justify-between'>
                                <div className='flex gap-2'>
                                    {/* img */}
                                    <div className='w-10 h-10 rounded-full border-[1px]'></div>
                                    <div className='flex flex-col items-start justify-start '>
                                        <span className='text-sm'>{!user.receiver_name ? user.receiver_email.split("@")[0] : user.receiver_name}</span>
                                        <span className='bg-opacity-50 text-xs'>{user.receiver_email}</span>
                                    </div>
                                </div>
                                {/* action */}
                                <motion.div
                                    onHoverStart={() => {
                                        setSendHovered(true)
                                    }}
                                    onHoverEnd={() => {
                                        setSendHovered(false)
                                    }}
                                    className='bg-black p-2 rounded-md cursor-pointer '>
                                    <IconSend size={16} color='white' />
                                </motion.div>
                                <AnimatePresence mode='wait'>
                                    {
                                        isSendHovered &&
                                        <Tooltip
                                            title="Quick Send Money"
                                            className='right-0 top-11 text-[0.65rem]'
                                        />
                                    }
                                </AnimatePresence>
                            </div>
                        ))
                }
            </div>
        </div>
    )
}
