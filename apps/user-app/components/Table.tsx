'use client';
import React from 'react'

export const Table = ({ children }: { children: React.ReactNode }) => {
    return (
        <table className='w-full'>
            {children}
        </table>
    )
}