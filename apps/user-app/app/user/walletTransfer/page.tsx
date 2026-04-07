"use client";
import React from 'react'
import { PageTopBar } from '../../../components/PageTopBar';
import { AmountCardContainer } from '../../../components/BalanceComp/AmountCard/AmountCardContainer';
import { PageBaseUi } from '@repo/ui/PageBaseUi';
import { TransferForm } from '../../../components/walletTransferComp/TransferForm';
import { RecentTransactions } from '../../../components/walletTransferComp/RecentTransactions';
import { SpendingChart } from '../../../components/walletTransferComp/SpendingChart';

export default function page() {

    return (
        <PageBaseUi>
            <PageTopBar title='Transaction' />
            <div className="flex h-full px-5 flex-col gap-3 ">
                <div className='flex gap-2 items-center mb-3 w-full'>
                    <AmountCardContainer className='bg-white w-full' absoluteContainerClassname='w-[59rem]' id='spendingChart' >
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
