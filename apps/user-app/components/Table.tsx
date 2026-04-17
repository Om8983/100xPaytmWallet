'use client';
import React from 'react'

export const Table = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <table className={`w-full ${className}`}>
            {children}
        </table>
    )
}