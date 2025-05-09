"use client";
import { store } from '@repo/redux'
import React from 'react'
import { Provider } from 'react-redux'

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}
