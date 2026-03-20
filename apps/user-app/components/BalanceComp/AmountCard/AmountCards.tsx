"use client";
import React, { useState } from 'react'
import { AmountCardContainer } from './AmountCardContainer'
import { AmountCardContent } from './AmountCardContent'
import { AmountCardTitle } from './AmountCardTitle'
import { Button } from '@repo/ui/button'
import { IconCircleCheckFilled } from '@tabler/icons-react'

type AmountCardProps = {
    totalBalance?: number;
}
export const AmountCards = ({ totalBalance }: AmountCardProps) => {
    const [loading, setLoading] = useState(false)
    return (
        <div className=" flex gap-2 items-center mb-3 ">
            <AmountCardContainer containerStyles="ml-2" cardStyles="bg-[#393bfe]"  >
                {/* i wanna have a encode number representation animation. Like when viewAmount is being clicked then random nos. should be animated and then real number will be presented. */}
                <AmountCardTitle showIcon={true} title="TOTAL INCOME" iconStyle="stroke-[#393bfe]" classname="text-white" />
                <AmountCardContent classname="text-white" iconStyle="stroke-white" icon={false} >
                    <Button
                        text="Check Balance"
                        className="text-[0.78rem] w-auto px-2 py-1 rounded-xl text-nowrap bg-white cursor-pointer "
                        isLogin={false}
                        icon={<IconCircleCheckFilled size={18} color='green' />}
                        handleClick={() => { }}
                        loading={loading}
                    />
                </AmountCardContent>
            </AmountCardContainer>
            <AmountCardContainer containerStyles="ml-5" cardStyles="bg-white" >
                <AmountCardTitle showIcon={false} title="SPENDINGS" />
                <AmountCardContent classname="text-white" />
            </AmountCardContainer>
            <AmountCardContainer containerStyles="ml-5" cardStyles="bg-white"  >
                <AmountCardTitle showIcon={false} title="RECEIVED" />
                <AmountCardContent classname="text-white" />
            </AmountCardContainer>

        </div>
    )
}