"use client";
import React from 'react'
import { Table } from '../Table'
import {motion} from "motion/react";
type TableType = {
    columns : {key : string, label : string}[];
    user_txnData : {}[];
}
export const TransactionTable = ({columns, user_txnData} : TableType) => {
// export const TransactionTable = () => {
    return (
        // <div className="flex-1 rounded-md w-full border-[0.8px] border-neutral-400 ">
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="rounded-md border overflow-scroll h-[100%]"
        >
            <Table columns={columns} txn_data={user_txnData} />
        </motion.div>
    )
}

// FILTERS
// bank transfers (default)
// peer transaction

// ---------------
// bank transfer
 
// amount
// start date
// end time
// payment status
// txn /onramp id
//