"use client";
import { IconSend } from '@tabler/icons-react'
import React, { useState } from 'react'
import { AnimatePresence, motion } from "motion/react"
import { Tooltip } from "@repo/ui/Tooltip"
export const QuickPayments = () => {
    const [isSendHovered, setSendHovered] = useState<boolean>(false)

    return (
        <div className="rounded-lg border border-border bg-card p-6 h-full flex flex-col w-1/3">
            <div className="mb-6 pb-4 border-b border-border">
                <h3 className="text-lg font-semibold text-foreground">Quick Payments</h3>
                {/* <p className="text-xs text-muted-foreground mt-1"></p> */}
            </div>
            <div className='flex items-center justify-evenly border-b border-border mb-6 pb-4'>
                <div className='w-20 h-20 rounded-xl border-[1px] '></div>
                <div className='w-20 h-20 rounded-xl border-[1px] '></div>
                <div className='w-20 h-20 rounded-xl border-[1px] '></div>
                <div className='w-20 h-20 rounded-xl border-[1px] '></div>
            </div>
            <div className='flex flex-col justify-center gap-2'>
                <div className='relative flex items-center justify-between'>
                    <div className='flex gap-2'>
                        {/* img */}
                        <div className='w-10 h-10 rounded-full border-[1px]'></div>
                        <div className='flex flex-col items-start justify-start '>
                            <span className='text-sm'>John Doe</span>
                            <span className='bg-opacity-50 text-xs'>johndoe@gmail.com</span>
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
            </div>
        </div>
    )
}
