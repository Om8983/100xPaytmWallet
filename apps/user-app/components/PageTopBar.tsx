"use client";
import { IconBrandGithub, IconLayoutSidebar } from '@tabler/icons-react';
import React from 'react'
import { useSideContext } from '../providers';


type SideType = {
    toggle: () => void
}
export const PageTopBar = ({ title }: { title: string }) => {
    const context = useSideContext()
    const { toggle } = context as SideType

    return (
        <div className='mb-6'>
            <div className='w-full flex p-4 justify-between items-center'>
                <div className='flex items-center gap-3 '>
                    <IconLayoutSidebar className='cursor-pointer' onClick={() => toggle()} size={18} />
                    <span className='font-light mt-[-3px]'> | </span>
                    <p className='font-medium text-md'>{title}</p>
                </div>
                <a href='https://github.com/Om8983' target='_blank' className='flex gap-2 items-center pl-10'>
                    <IconBrandGithub size={18} /> GitHub
                </a>
            </div>
            <hr className='w-full ' />
        </div>
    )
}