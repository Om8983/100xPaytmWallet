"use client";
import React, { useState, useRef } from 'react'
import { motion } from 'motion/react'
import { AmountCardContent } from './AmountCardContent'
import { AmountCardTitle } from './AmountCardTitle'
import { Button } from '@repo/ui/button'
import { IconCircleCheckFilled } from '@tabler/icons-react'
import { AmountCardContainer } from './AmountCardContainer';


type AmountCardProps = {
    totalBalance?: number;
}
type CardGlow = {
    x: number;
    y: number;
}
export const AmountCards = ({ totalBalance }: AmountCardProps) => {
    const [loading, setLoading] = useState(false)

    const [isWrapperHovered, setIsWrapperHovered] = useState(false)
    const [glowPositions, setGlowPositions] = useState<Record<string, CardGlow>>({})
    const cardRefs = useRef<Record<string, HTMLDivElement | null>>({})

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const updated: Record<string, CardGlow> = {}
        // here we are running a loop to assign the mouse position i.e x and y, to each card.That way each card even when not hovered will get the positions of the mouse
        for (const [id, el] of Object.entries(cardRefs.current)) {
            if (!el) continue
            const rect = el.getBoundingClientRect()
            // here to mention we are only targeting the parent wrapper. That means we want the coordinates of the mouse only when mouse enters the vicinity of the parent element. Thats the reason of subtracting rect.left and rect.top to get the positions of mouse from the top and left of the container wrapper
            updated[id] = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            }
        }
        // finally we just set the location of mouse with respect to each card.
        setGlowPositions(updated)
    }

    return (
        <div
            // mouse move given to this because whenever the mouse will be hovered of enter the vicinity of this parent class of the cards then mouse coordination will be shared to the inidividual card.
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsWrapperHovered(true)}
            onMouseLeave={() => setIsWrapperHovered(false)}
            className="flex gap-2 items-center mb-3 "
            
        >
            <AmountCardContainer id='income' className='bg-[#393bfe]' isWrapperHovered={isWrapperHovered} cardRefs={cardRefs} glowPositions={glowPositions}>
                <AmountCardTitle showIcon={true} title="TOTAL INCOME" iconStyle="stroke-[#393bfe]" classname="text-white" />
                <AmountCardContent classname="text-white" iconStyle="stroke-white" icon={false}>
                    <Button
                        text="Check Balance"
                        className="text-[0.78rem] w-auto px-2 py-1 rounded-xl text-nowrap bg-white cursor-pointer"
                        isLogin={false}
                        icon={<IconCircleCheckFilled size={18} color='green' />}
                        handleClick={() => { }}
                        loading={loading}
                    />
                </AmountCardContent>
            </AmountCardContainer>
            <AmountCardContainer id='spendings' className='bg-white' isWrapperHovered={isWrapperHovered} cardRefs={cardRefs} glowPositions={glowPositions}>
                <AmountCardTitle showIcon={false} title="SPENDINGS" />
                <AmountCardContent classname="text-white" />
            </AmountCardContainer>
            <AmountCardContainer id='received' className='bg-white' isWrapperHovered={isWrapperHovered} cardRefs={cardRefs} glowPositions={glowPositions}>
                <AmountCardTitle showIcon={false} title="RECEIVED" />
                <AmountCardContent classname="text-white" />
            </AmountCardContainer>
        </div>
    )
}