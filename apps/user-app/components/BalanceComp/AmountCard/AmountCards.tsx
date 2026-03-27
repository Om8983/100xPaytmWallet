"use client";
import React, { useState, useRef } from 'react'
import { motion } from 'motion/react'
import { AmountCardContent } from './AmountCardContent'
import { AmountCardTitle } from './AmountCardTitle'
import { Button } from '@repo/ui/button'
import { IconCircleCheckFilled } from '@tabler/icons-react'
import { AmountCardContainer } from './AmountCardContainer';
import { NumberCounter } from "@repo/ui/NumberCounter"

type AmountCardProps = {
    totalBalance?: number;
}
// type CardGlow = {
//     x: number;
//     y: number;
//     angle: number;
// }
type CardGlow = {
    angle: number  // degrees, for --start
}
export const AmountCards = ({ totalBalance }: AmountCardProps) => {
    const [loading, setLoading] = useState(false)

    const [isWrapperHovered, setIsWrapperHovered] = useState(false)
    // const [glowPositions, setGlowPositions] = useState<Record<string, CardGlow>>({})
    const [glowAngles, setGlowAngles] = useState<Record<string, number>>({})
    const cardRefs = useRef<Record<string, HTMLDivElement | null>>({})

    const [cardActive, setCardActive] = useState<Record<string, boolean>>({})
    // const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    //     const updated: Record<string, CardGlow> = {}
    //     // here we are running a loop to assign the mouse position i.e x and y, to each card.That way each card even when not hovered will get the positions of the mouse
    //     for (const [id, el] of Object.entries(cardRefs.current)) {
    //         if (!el) continue
    //         const rect = el.getBoundingClientRect()
    //         const x = e.clientX - rect.left
    //         const y = e.clientY - rect.top

    //         // Angle from card center to cursor — this rotates the conic sweep
    //         const angle = Math.atan2(
    //             y - rect.height / 2,
    //             x - rect.width / 2
    //         )

    //         updated[id] = { x, y, angle }
    //     }
    //     // finally we just set the location of mouse with respect to each card.
    //     setGlowPositions(updated)
    // }
    const PROXIMITY_THRESHOLD = 150  // px — how far outside the card cursor can be and still show glow

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const updatedAngles: Record<string, number> = {}
        const updatedActive: Record<string, boolean> = {}

        for (const [id, el] of Object.entries(cardRefs.current)) {
            if (!el) continue
            const rect = el.getBoundingClientRect()
            const x = e.clientX - rect.left - rect.width / 2
            const y = e.clientY - rect.top - rect.height / 2

            // Clamp cursor to card edges, measure distance from there
            const clampedX = Math.max(-rect.width / 2, Math.min(rect.width / 2, x))
            const clampedY = Math.max(-rect.height / 2, Math.min(rect.height / 2, y))
            const distanceFromEdge = Math.sqrt(
                (x - clampedX) ** 2 + (y - clampedY) ** 2
            )

            updatedActive[id] = distanceFromEdge < PROXIMITY_THRESHOLD
            updatedAngles[id] = Math.atan2(y, x) * (180 / Math.PI) + 90
        }

        setGlowAngles(updatedAngles)
        setCardActive(updatedActive)
    }
    return (
        <div
            // mouse move given to this because whenever the mouse will be hovered of enter the vicinity of this parent class of the cards then mouse coordination will be shared to the inidividual card.
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsWrapperHovered(true)}
            onMouseLeave={() => {
                setIsWrapperHovered(false)
                setCardActive({})
            }}
            className="flex gap-2 items-center mb-3 "
        >
            <AmountCardContainer
                glowAngles={glowAngles}
                id='income'
                className='bg-[#393bfe]'
                isWrapperHovered={isWrapperHovered}
                cardRefs={cardRefs}
                cardActive={cardActive}
            >
                <AmountCardTitle
                    showIcon={true}
                    title="TOTAL INCOME"
                    iconStyle="stroke-[#393bfe]"
                    classname="text-white" >
                    <NumberCounter
                        to={23420}

                    />
                </AmountCardTitle>
                <AmountCardContent
                    classname="text-white"
                    iconStyle="stroke-white"
                    icon={false}
                >
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
            <AmountCardContainer
                glowAngles={glowAngles}
                id='spendings'
                className='bg-white'
                isWrapperHovered={isWrapperHovered}
                cardRefs={cardRefs}
                cardActive={cardActive}
            >
                <AmountCardTitle
                    showIcon={false}
                    title="SPENDINGS" />
                <AmountCardContent classname="text-white" />
            </AmountCardContainer>
            <AmountCardContainer
                glowAngles={glowAngles}
                id='received'
                className='bg-white'
                isWrapperHovered={isWrapperHovered}
                cardRefs={cardRefs}
                cardActive={cardActive}
            >
                <AmountCardTitle
                    showIcon={false}
                    title="RECEIVED" />
                <AmountCardContent classname="text-white" />
            </AmountCardContainer>
        </div>
    )
}