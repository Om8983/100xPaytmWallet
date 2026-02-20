import React from 'react'

type Props = {
    className?: string
    title: string
    amount: number
}
export const AmountCard = ({ className, title, amount }: Props) => {
    return (
        <div className={`${className} bg-[#393bfe] w-[400px] h-[200px] rounded-md border-none outline-none p-5`}>
            {/* i wanna have a encode number representation animation. Like when viewAmount is being clicked then random nos. should be animated and then real number will be presented. */}
            <div className='font-[headmed] tracking-wider text-white text-4xl'>{title}</div>
            <div className='text-white mt-2 font-[paramed] text-3xl'>3,325,32.33</div>
            <div className=''><IconArrowUpRight size={20} color="white" /></div>
        </div>
    )
}
