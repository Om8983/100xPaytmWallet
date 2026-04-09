'use client';
import React from 'react'
import { THead } from "@repo/ui/THead"
import { TBody } from "@repo/ui/TBody"

type TableProps = {
    txn_data: any[],
    columns: {
        key: string,
        label: string
    }[]
}

export const Table = ({ columns, txn_data }: TableProps) => {

    return (
        <table className='w-full'>
            <THead header={columns.map(c => c.label)} />
            <TBody body={txn_data} columns={columns} />
        </table>
    )
}