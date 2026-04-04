'use client';
import React from 'react'
import { THead } from "@repo/ui/THead"
import { TBody } from "@repo/ui/TBody"

type TableProps<T> = {
    txn_data: T[],
    columns: {
        key: string,
        label: string
    }[]
}

export const Table = <T,>({ columns, txn_data }: TableProps<T>) => {

    return (
        <table className='w-full'>
            <THead header={columns.map(c => c.label)} />
            <TBody<T> body={txn_data} columns={columns} />
        </table>
    )
}