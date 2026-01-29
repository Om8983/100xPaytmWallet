"use client";
import { store } from '@repo/redux'
import { SessionProvider } from 'next-auth/react';
import React from 'react'
import { Provider } from 'react-redux'

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <Provider store={store}>
                {children}
            </Provider>
        </SessionProvider>
    )
}
