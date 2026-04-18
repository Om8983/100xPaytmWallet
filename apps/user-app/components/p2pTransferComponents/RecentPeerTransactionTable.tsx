"use client";
import React from 'react'
import { P2PData } from '../BalanceComp/TransactionTable';
import { AllTxnData } from '../BalanceComp/AllTxnData';


type PeerTableData = {
    peer_txnData: P2PData[];
}

export const RecentPeerTransactionTable = ({ peer_txnData }: PeerTableData) => {

    const p2pTxnCols = [
        { key: "txn_id", label: "Transaction Id" },
        { key: "amount", label: "Amount" },
        { key: "txn_status", label: "Status" },
        // { key: "provider", label: "Provider" },
        { key: "txn_type", label: "Type" },
        { key: "start_time", label: "Created At" },
        { key: "end_time", label: "Completed At" },
        { key: "sender", label: "Sender" },
        { key: "receiver", label: "Receiver" },
    ]

    return (
        <>
            <p className="text-3xl mb-2">Recent Peer Transactions</p>
            <AllTxnData txn_data={peer_txnData} columns={p2pTxnCols} />
        </>
    )
}