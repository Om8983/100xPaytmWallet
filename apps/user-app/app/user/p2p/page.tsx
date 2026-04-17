import { PageBaseUi } from '@repo/ui/PageBaseUi'
import React from 'react'
import { PeerTransferForm } from '../../../components/p2pTransferComponents/PeerTransferForm'
import { PageTopBar } from '../../../components/PageTopBar'
import { QuickPayments } from '../../../components/p2pTransferComponents/QuickPayments'
import { RecentPeerTransactionTable } from '../../../components/p2pTransferComponents/RecentPeerTransactionTable'
import { unstable_cache } from 'next/cache'
import { getP2PtxnData } from '../../actions/transaction/action'
import { getUserOrThrow } from '../../../lib/auth/utils'

export default async function page() {
    const userSession = await getUserOrThrow()
    const userId = userSession?.id


    const p2pTxndataCacheFn = unstable_cache(() => getP2PtxnData(userId), ['balance-txn', userId], {
        tags: ['balanceTxnData'],
        revalidate: 10
    });
    const txnData = await p2pTxndataCacheFn()

    return (
        <PageBaseUi>
            <PageTopBar title='Peer To Peer Transfer' />
            <div className=' overflow-scroll scroll-smooth w-full h-full p-5 '>
                <div className='flex items-stretch  gap-2 mb-6 '>
                    <PeerTransferForm />
                    <QuickPayments data={[]} />
                </div>
                <RecentPeerTransactionTable peer_txnData={txnData} />
            </div>
        </PageBaseUi>
    )
}
