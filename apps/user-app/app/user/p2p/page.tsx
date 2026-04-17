import { PageBaseUi } from '@repo/ui/PageBaseUi'
import React from 'react'
import { PeerTransferForm } from '../../../components/p2pTransferComponents/PeerTransferForm'
import { PageTopBar } from '../../../components/PageTopBar'
import { QuickPayments } from '../../../components/p2pTransferComponents/QuickPayments'
import { RecentPeerTransactionTable } from '../../../components/p2pTransferComponents/RecentPeerTransactionTable'

export default function page() {
    return (
        <PageBaseUi>
            <PageTopBar title='Peer To Peer Transfer' />
            <div className=' overflow-scroll scroll-smooth w-full h-full p-5 '>
                <div className='flex items-stretch  gap-2 mb-6 '>
                    <PeerTransferForm />
                    <QuickPayments data={[]} />
                </div>
                <RecentPeerTransactionTable peer_txnData={[]} />
            </div>
        </PageBaseUi>
    )
}
