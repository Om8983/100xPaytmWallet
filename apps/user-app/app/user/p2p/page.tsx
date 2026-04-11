import { PageBaseUi } from '@repo/ui/PageBaseUi'
import React from 'react'
import { PeerTransferForm } from '../../../components/p2pTransferComponents/PeerTransferForm'
import { PageTopBar } from '../../../components/PageTopBar'
import { RecentTransactions } from '../../../components/walletTransferComp/RecentTransactions'
import { QuickPayments } from '../../../components/p2pTransferComponents/QuickPayments'

export default function page() {
    return (
        <PageBaseUi>
            <PageTopBar title='Peer To Peer Transfer' />
            <div className='flex items-center gap-2 w-full p-5'>
                <PeerTransferForm />
                <QuickPayments />
            </div>
        </PageBaseUi>
    )
}
