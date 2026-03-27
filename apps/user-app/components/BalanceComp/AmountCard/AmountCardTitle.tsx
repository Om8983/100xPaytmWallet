import { IconArrowUpRight } from '@tabler/icons-react'
import React from 'react'
type CardTitleProps = {
    title: string;
    showIcon: boolean;
    iconStyle?: string;
    classname?: string;
    children?: React.ReactNode;
}
export const AmountCardTitle = ({ title, showIcon, iconStyle, classname, children }: CardTitleProps) => {
    return (
        <>
            <div className="flex flex-col justify-between h-full gap-3">
                <div className={`tracking-wider font-light text-xl  ${classname}`}>{title}</div>
                <div className={`mt-2 text-3xl ${classname}`}>
                    {/* {user_Balance_Txn?.Balance?.balance ?? 0} */}
                    {children}
                    {/* 5 */}
                </div>
            </div>
            {showIcon && <div className='w-[40px] h-[40px] absolute top-6 right-6 bg-white rounded-full flex items-center justify-center '><IconArrowUpRight size={28} className={`${iconStyle}`} /></div>}
        </>
    )
}
