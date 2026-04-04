"use client";
import { Button } from '@repo/ui/button'
import React, { useCallback, useRef, useState } from 'react'
import { PageTopBar } from '../../../components/PageTopBar';
import { AmountCardContainer } from '../../../components/BalanceComp/AmountCard/AmountCardContainer';
import { PageBaseUi } from '@repo/ui/PageBaseUi';
import { IconCurrencyRupee, IconEye, IconEyeClosed } from '@tabler/icons-react';
import { AmountCardTitle } from '../../../components/BalanceComp/AmountCard/AmountCardTitle';
import { AmountCardContent } from '../../../components/BalanceComp/AmountCard/AmountCardContent';
import { TransferForm } from '../../../components/walletTransferComp/TransferForm';
import { RecentTransactions } from '../../../components/walletTransferComp/RecentTransactions';
import { SpendingChart } from '../../../components/walletTransferComp/SpendingChart';

type WalletTransferProps = {
    walletBalance: number;

}
export default function page({ walletBalance }: WalletTransferProps) {
    const [isHidden, setIsHidden] = useState(false)
    const [amount, setAmount] = useState<Number>(0)
    const cardRefs = useRef<Record<string, HTMLDivElement | null>>({})

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
        <PageBaseUi>
            <PageTopBar title='Transaction' />
            <div className="flex h-full px-5 flex-col gap-3 ">
                <div
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className='flex gap-2 items-center mb-3 w-full'>
                    <AmountCardContainer className='bg-[#393bfe] ' id='walletBalance' cardRefs={cardRefs} >
                        <AmountCardTitle
                            showIcon={true}
                            title="TOTAL INCOME"
                            iconStyle="stroke-[#393bfe]"
                            classname="text-white" >
                            <div className='flex gap-1 items-center mb-1'>
                                <IconCurrencyRupee size={36} />
                                {!isHidden && "****"}
                                {/* {loading && (
                            <span className="relative overflow-hidden w-20 h-7 rounded-md bg-white/20">
                                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-[shimmer_1.2s_infinite]" />
                            </span>
                        )} */}
                                {/* {!loading && balance !== null && (
                            <NumberCounter to={balance} />
                        )} */}
                            </div>
                        </AmountCardTitle>
                        <AmountCardContent
                            classname="text-white"
                            iconStyle="stroke-white"
                            icon={false}
                        >
                            <Button
                                text=""
                                className={`text-[0.78rem] w-auto px-2 py-1 rounded-xl text-nowrap bg-white cursor-pointer hover:bg-opacity-90`}
                                isLogin={false}
                                icon={isHidden ? <IconEye size={18} /> : <IconEyeClosed size={18} />}
                                handleClick={() => setIsHidden(prev => !prev)}
                            />
                        </AmountCardContent>
                    </AmountCardContainer>
                    <AmountCardContainer className='bg-white w-[59rem]' absoluteContainerClassname='w-[59rem]' id='spendingChart' cardRefs={cardRefs}>
                        <SpendingChart />
                    </AmountCardContainer>
                </div>
                <div className='flex items-center gap-2 w-full'>
                    <TransferForm
                        onTransferComplete={() => { }}
                    />
                    <RecentTransactions />
                </div>
            </div>
        </PageBaseUi>
    )
}
