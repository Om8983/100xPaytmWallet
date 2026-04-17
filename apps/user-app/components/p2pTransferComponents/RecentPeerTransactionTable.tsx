"use client";
import React from 'react'
import { Table } from '../Table';
import { THead } from '@repo/ui/THead';
import { TBody } from '@repo/ui/TBody';
import { P2PData } from '../BalanceComp/TransactionTable';


type PeerTableData = {
    peer_txnData: P2PData[];
}

export const RecentPeerTransactionTable = ({ peer_txnData }: PeerTableData) => {

    const p2pTxnCols = [
        { key: "txn_id", label: "Transaction Id" },
        { key: "amount", label: "Amount" },
        { key: "txn_status", label: "Status" },
        // { key: "provider", label: "Provider" },
        { key: "sender", label: "Created At" },
        { key: "receiver", label: "Completed At" },
    ]

    return (
        <>
            <p className="text-3xl mb-2">Recent Peer Transactions</p>
            <Table className='border rounded-md'>
                <THead header={p2pTxnCols.map(c => c.label)} />
                <TBody body={peer_txnData} columns={p2pTxnCols}>
                    {
                        !peer_txnData ?
                            <img src="/nodatafound.png" alt="no data found" className="mx-auto mt-[5rem]" width={300} height={300} />
                            :
                            <></>
                    }
                </TBody>
            </Table>
        </>
    )
}