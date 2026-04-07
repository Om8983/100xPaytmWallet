"use client";
import React, { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useSideContext } from '../providers'
import { IconBuildingBank, IconCashRegister, IconCoin, IconHelpCircle, IconLayoutDashboard, IconLogout, IconSettings, IconTrendingUp, IconUserCircle } from '@tabler/icons-react'
import { Button } from '@repo/ui/button';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

type SideType = {
    open: boolean
}
const Sidebar = () => {
    const context = useSideContext()
    const { open } = context as SideType;
    const navLinks = [
        {
            path: '/user/dashboard',
            title: 'Dashboard',
            icon: <IconLayoutDashboard size={20} />
        },
        {
            path: '/user/balance',
            title: 'Balance & Transaction',
            icon: <IconCashRegister size={20} />
        },
        {
            path: '/user/p2p',
            title: 'Peer-To-Peer',
            icon: <IconTrendingUp size={20} />
        },
        {
            path: '/user/walletTransfer',
            title: 'Wallet Transfer',
            icon: <IconBuildingBank size={20} />
        }
    ]

    const configLink = [
        {
            path: '/setting',
            title: 'Setting',
            icon: <IconSettings size={20} />
        },
        {
            path: '/setting/help',
            title: 'Help',
            icon: <IconHelpCircle size={20} />
        },
        {
            path: '/setting/profile',
            title: 'Profile',
            icon: <IconUserCircle size={20} />
        },
    ]

    const session: any = useSession()
    const [loading, setLoading] = useState(false)

    // because motion can't go directly with next's Link, so a custom component by motion is created here
    // const MotionLink = motion(Link)

    // defined variants to avoid repeacted styles
    const variants = {
        initial: { opacity: 0, y: 5, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 5, scale: 0.95 },
    }
    return (
        <AnimatePresence mode="wait">
            {open && (
                <motion.div
                    key="sidebar"
                    initial={{ width: 0, opacity: 0, y: 5, scale: 0.95 }}
                    animate={{ width: 300, opacity: 1, y: 0, scale: 1 }}
                    exit={{ width: 0, opacity: 0, y: 5, scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 40, mass: 0.3, restSpeed: 0.1, restDelta: 0.025 }}
                    className=" rounded-xl overflow-hidden"
                >
                    <div className='p-3 '>
                        <div className="text-2xl font-bold mb-[10px]">100xPaytm</div>
                        <hr className='mb-8 border-black border-[0.5px]' />

                        <div className='flex flex-col h-[calc(100vh-10rem)] justify-between  items-start '>
                            <div className='flex flex-col gap-4 w-full'>
                                {
                                    navLinks.map(c => {
                                        return <React.Fragment key={c.path}>
                                            <Link href={c.path}>
                                                <div
                                                    //@ts-ignore
                                                    variants={variants}
                                                    initial={variants.initial}
                                                    animate={variants.animate}
                                                    exit={variants.exit}
                                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                                    href={c.path} className='flex gap-2 items-center  px-2 py-1 hover:bg-neutral-100 rounded-md'
                                                >
                                                    {c.icon}
                                                    <p className=' text-nowrap'>{c.title}</p>
                                                </div>
                                            </Link>
                                        </React.Fragment>
                                    })
                                }
                            </div>
                            <div className='flex flex-col gap-4 w-full '>
                                <div className='flex flex-col gap-4 w-full items-start'>
                                    {
                                        configLink.map(c => {
                                            return <React.Fragment key={c.path} >
                                                <div
                                                    //@ts-ignore
                                                    variants={variants}
                                                    initial={variants.initial}
                                                    animate={variants.animate}
                                                    exit={variants.exit}
                                                    // href={c.path}
                                                    className='flex gap-2 items-center px-2 py-1 hover:bg-neutral-100 w-full rounded-md cursor-pointer'>
                                                    {c.icon}
                                                    <p className=' text-nowrap'>{c.title}</p>
                                                </div>
                                            </React.Fragment>
                                        })
                                    }
                                </div>
                                {/* <div className='pl-3 flex items-center gap-3 text-xl font-medium'>Logout <IconLogout size={20} /></div> */}
                                {session.status === "authenticated" &&
                                    <Button
                                        handleClick={() => {
                                            setLoading(true)
                                            signOut({ callbackUrl: "/auth/signin" })
                                            setLoading(false)
                                        }}
                                        loading={loading}
                                        text='Logout'
                                        icon={<IconLogout size={20} />}
                                        className={`${loading && "bg-black/80"} w-full h-auto bg-black text-white hover:bg-black/80`}
                                    />
                                }
                            </div>
                        </div>
                    </div>

                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Sidebar