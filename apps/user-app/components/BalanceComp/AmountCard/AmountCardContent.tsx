import { IconTrendingUp } from '@tabler/icons-react'
import React from 'react'

type CardContentProps = {
    iconStyle?: string;
    classname?: string;
    icon?: boolean;
    iconStat?: string;  // will implement it later based on the various statistics.
    children?: React.ReactNode // if any more component that user wants to add
}
export const AmountCardContent = ({ iconStyle, classname, icon = true, iconStat, children }: CardContentProps) => {
    return (
        <>
            {
                icon &&
                <div className='w-[70px] h-[34px] px-[0.15rem] py-[0.15rem] absolute bottom-6 right-6  bg-white rounded-2xl  flex items-center justify-center '>
                    <div className={`w-full h-full bg-[#393bfe] text-[0.8rem] justify-center flex items-center gap-1 inset-0 rounded-2xl ${classname}`}>
                        <IconTrendingUp size={14} className={`${iconStyle}`} /> 7.1 %
                    </div>
                </div>
            }
            <div className=' absolute bottom-6 right-6 '>
                {children}
            </div>
        </>
    )
}