"use client";
import React, { useState, useRef, useCallback, useEffect } from 'react'
import { motion } from 'motion/react'
import { AmountCardContent } from './AmountCardContent'
import { AmountCardTitle } from './AmountCardTitle'
import { Button } from '@repo/ui/button'
import { IconCircleCheckFilled, IconCurrencyRupee } from '@tabler/icons-react'
import { AmountCardContainer } from './AmountCardContainer';
import { NumberCounter } from "@repo/ui/NumberCounter"
import getUserBalance from '../../../app/actions/user/action';
import { toast } from 'sonner';


// type CardGlow = {
//     x: number;
//     y: number;
//     angle: number;
// }
type CardGlow = {
    angle: number  // degrees, for --start
}
export const AmountCards = () => {
    const shimmerStyle = `
    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
    `;
    const [loading, setLoading] = useState(false)
    const [balance, setBalance] = useState<number | null>(null)
    // const [isWrapperHovered, setIsWrapperHovered] = useState(false)
    // const [glowPositions, setGlowPositions] = useState<Record<string, CardGlow>>({})
    // const [glowAngles, setGlowAngles] = useState<Record<string, number>>({})
    const cardRefs = useRef<Record<string, HTMLDivElement | null>>({})

    // const [cardActive, setCardActive] = useState<Record<string, boolean>>({})
    // const [glowState, setGlowState] = useState<Record<string, { angle: number; active: boolean }>>({})
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
    // const PROXIMITY_THRESHOLD = 150  // px — how far outside the card cursor can be and still show glow

    // const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    //     const updatedAngles: Record<string, number> = {}
    //     const updatedActive: Record<string, boolean> = {}

    //     for (const [id, el] of Object.entries(cardRefs.current)) {
    //         if (!el) continue
    //         const rect = el.getBoundingClientRect()
    //         const x = e.clientX - rect.left - rect.width / 2
    //         const y = e.clientY - rect.top - rect.height / 2

    //         // Clamp cursor to card edges, measure distance from there
    //         const clampedX = Math.max(-rect.width / 2, Math.min(rect.width / 2, x))
    //         const clampedY = Math.max(-rect.height / 2, Math.min(rect.height / 2, y))
    //         const distanceFromEdge = Math.sqrt(
    //             (x - clampedX) ** 2 + (y - clampedY) ** 2
    //         )

    //         updatedActive[id] = distanceFromEdge < PROXIMITY_THRESHOLD
    //         updatedAngles[id] = Math.atan2(y, x) * (180 / Math.PI) + 90
    //     }

    //     setGlowAngles(updatedAngles)
    //     setCardActive(updatedActive)
    // }

    // server action to get the user balance on each click of 'check balance', which will again reset to masking state when user navigates to some other tab
    // const balance = await getUserBalance({ userId })
    const handleCheckBalance = async () => {
        try {
            setLoading(true)
            const res = await getUserBalance()
            toast.success("Balance Fetched Successfully!")
            setBalance(res as number)
        } catch (error) {
            toast.error("Error fetching ")
            setLoading(false)
            return
        } finally {
            setLoading(false)
        }
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        for (const [id, el] of Object.entries(cardRefs.current)) {
            if (!el) continue
            const rect = el.getBoundingClientRect()
            const x = e.clientX - rect.left - rect.width / 2
            const y = e.clientY - rect.top - rect.height / 2
            const angle = Math.atan2(y, x) * (180 / Math.PI) + 90

            const clampedX = Math.max(-rect.width / 2, Math.min(rect.width / 2, x))
            const clampedY = Math.max(-rect.height / 2, Math.min(rect.height / 2, y))
            const dist = Math.sqrt((x - clampedX) ** 2 + (y - clampedY) ** 2)

            // Write directly to DOM — zero re-renders
            el.style.setProperty('--glow-angle', `${angle}`)
            el.style.setProperty('--glow-active', dist < 150 ? '1' : '0')
        }
    }
    const handleMouseLeave = useCallback(() => {
        for (const el of Object.values(cardRefs.current)) {
            if (!el) continue;
            el.style.setProperty("--glow-active", "0");
        }
    }, []);
    return (
        <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="flex gap-2 items-center mb-3"
        >
            <style>{shimmerStyle}</style>
            <AmountCardContainer
                // glowAngles={glowAngles}
                id='income'
                className='bg-[#393bfe]'
                // isWrapperHovered={isWrapperHovered}
                cardRefs={cardRefs}
            // cardActive={cardActive}
            >
                <AmountCardTitle
                    showIcon={true}
                    title="WALLET BALANCE"
                    iconStyle="stroke-[#393bfe]"
                    classname="text-white" >
                    <div className='flex gap-1 items-center mb-1'>
                        <IconCurrencyRupee size={36} />
                        {!loading && balance === null && "****"}
                        {loading && (
                            <span className="relative overflow-hidden w-20 h-7 rounded-md bg-white/20">
                                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-[shimmer_1.2s_infinite]" />
                            </span>
                        )}
                        {!loading && balance !== null && (
                            <NumberCounter to={balance} />
                        )}
                    </div>
                </AmountCardTitle>
                <AmountCardContent
                    classname="text-white"
                    iconStyle="stroke-white"
                    icon={false}
                >
                    <Button
                        text="Check Balance"
                        className={`text-[0.78rem] w-auto px-2 py-1 rounded-xl text-nowrap bg-white cursor-pointer hover:bg-opacity-90 ${balance !== null && "cursor-not-allowed"}`}
                        isLogin={false}
                        icon={<IconCircleCheckFilled size={18} color='green' />}
                        handleClick={handleCheckBalance}
                        disabled={balance !== null}
                    />
                </AmountCardContent>
            </AmountCardContainer>
            <AmountCardContainer
                // glowAngles={glowAngles}
                id='spendings'
                className='bg-white'
                // isWrapperHovered={isWrapperHovered}
                cardRefs={cardRefs}
            // cardActive={cardActive}
            >
                <AmountCardTitle
                    showIcon={false}
                    title="SPENDINGS" />
                <AmountCardContent classname="text-white" />
            </AmountCardContainer>
            <AmountCardContainer
                // glowAngles={glowAngles}
                id='received'
                className='bg-white'
                // isWrapperHovered={isWrapperHovered}
                cardRefs={cardRefs}
            // cardActive={cardActive}
            >
                <AmountCardTitle
                    showIcon={false}
                    title="RECEIVED" />
                <AmountCardContent classname="text-white" />
            </AmountCardContainer>
        </div >
    );
}