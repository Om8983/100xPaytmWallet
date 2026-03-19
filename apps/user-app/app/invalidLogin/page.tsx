"use client";
import { signOut } from 'next-auth/react';
import React, { useEffect } from 'react'

export default function page() {
    useEffect(() => {
        (async () => {
            await signOut({ callbackUrl: "/auth/signin" })
        })()
    }, [])
    return (
        <>
            nothing to render
        </>
    )
}
