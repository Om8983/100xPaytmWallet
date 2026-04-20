import { unstable_cache } from 'next/cache';
import React from 'react'
import { getBalanceTxnData, getP2PtxnData } from '../../app/actions/transaction/action';
import { P2PData, TransactionTable, WalletData } from './TransactionTable';

type Props = {
    txn_type: string;
    userId: string;
}
export default async function TransactionTableWrapper({ txn_type, userId }: Props) {
    let txnData: WalletData[] = []
    let p2pData: P2PData[] = []

    const walletTransactionCols = [
        { key: "txn_id", label: "Transaction Id" },
        { key: "amount", label: "Amount" },
        { key: "txn_status", label: "Status" },
        { key: "provider", label: "Provider" },
        { key: "start_time", label: "Created At" },
        { key: "end_time", label: "Completed At" },
        { key: "type", label: "Type" },
    ]

    const p2pTxnCols = [
        { key: "txn_id", label: "Transaction Id" },
        { key: "amount", label: "Amount" },
        { key: "txn_status", label: "Status" },
        { key: "txn_type", label: "Type" },
        { key: "start_time", label: "Created At" },
        { key: "end_time", label: "Completed At" },
        { key: "sender", label: "Sender" },
        { key: "receiver", label: "Receiver" },
    ]
    if (txn_type === "p2p") {
        const p2pCachedFn = unstable_cache(() => getP2PtxnData(userId), ['p2p-txn', userId], {
            tags: ['p2pTxnData'],
            revalidate: 10
        });
        p2pData = await p2pCachedFn()
    } else {
        const balanceTxnCacheFn = unstable_cache(() => getBalanceTxnData(userId), ['balance-txn', userId], {
            tags: ['balanceTxnData'],
            revalidate: 10
        });

        txnData = await balanceTxnCacheFn();
    }
    return (
        <TransactionTable walletTransactionCols={walletTransactionCols} p2pTxnCols={p2pTxnCols} user_txnData={txnData} p2pData={p2pData} />
    )
}
