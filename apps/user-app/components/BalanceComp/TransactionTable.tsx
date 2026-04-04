"use client";
import React, { useRef, useState } from 'react'
import { Table } from '../Table'
import { motion } from "motion/react";
import { IconChevronDown, IconTransactionRupee, IconWallet } from '@tabler/icons-react';
import { Dropdown } from "@repo/ui/Dropdown/Dropdown"
import { DropdownItem } from "@repo/ui/Dropdown/DropdownItem"
import { useOutsideClickHandler } from '../../app/customHoolks/useOutsideClickHandler';

type TableType = {
    walletTransactionCols: { key: string, label: string }[];
    p2pTxnCols: { key: string, label: string }[];
    // user_txnData: {}[];
}
export const TransactionTable = ({ p2pTxnCols, walletTransactionCols }: TableType) => {

    const user_txnData: [] = [];
    const [txnFilterType, setTxnFilterType] = useState("wallet")
    // statsu for transaction type dropdown
    const [isTxnTypeDrop, setTxnTypeDrop] = useState<boolean>(false)

    const dropRef = useRef<HTMLDivElement | null>(null)
    useOutsideClickHandler({
        objRef: dropRef,
        isDropdown: isTxnTypeDrop,
        setDropdown: setTxnTypeDrop
    })

    return (
        <>
            <div className='flex justify-between items-center'>
                <p className="text-3xl mb-2">Transactions</p>
                <div
                    ref={dropRef}
                    className='relative'>
                    <button
                        className='flex gap-2 min-w-max items-center justify-center px-3 py-1 rounded-md border-[1px] border-neutral-200 shadow-md'
                        onClick={() => setTxnTypeDrop(prev => !prev)}
                    >
                        {txnFilterType.toLowerCase().trim() === "wallet" ? "Wallet Transactions" : "P2P Transaction"}
                        <IconChevronDown size={14} />
                    </button>
                    {/* options for selection of transaction filter type */}
                    <Dropdown
                        show={isTxnTypeDrop}
                        setShow={setTxnTypeDrop}
                    >

                        <DropdownItem
                            itemHandler={() => {
                                setTxnFilterType("wallet")
                                setTxnTypeDrop(false)
                            }}
                            className={`${txnFilterType === "wallet" && "bg-neutral-200 bg-opacity-50  "}`} >
                            <IconWallet size={16} /> Wallet Transations
                        </DropdownItem>
                        <DropdownItem
                            itemHandler={() => {
                                setTxnFilterType("p2p")
                                setTxnTypeDrop(false)
                            }}
                            className={`${txnFilterType === "p2p" && "bg-neutral-200 bg-opacity-50  "}`} >
                            <IconTransactionRupee size={16} /> P2P Transations
                        </DropdownItem>
                    </Dropdown>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="rounded-md border overflow-auto h-[100%]"
            >
                <Table columns={txnFilterType === "wallet" ? walletTransactionCols : p2pTxnCols} txn_data={user_txnData} />
            </motion.div>
        </>
    )
}