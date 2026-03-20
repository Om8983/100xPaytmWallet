"use client";
import { store } from '@repo/redux'
import { SessionProvider } from 'next-auth/react';
import React, { createContext, useContext, useState } from 'react'
import { Provider } from 'react-redux'
import { Toaster } from "sonner"
import Sidebar from './components/Sidebar';

type SidebarType = {
    open: boolean,
    toggle: () => void;
}
const SidebarContext = createContext<SidebarType | null>(null)

export const useSideContext = () => {
    const ctx = useContext(SidebarContext)
    if (!ctx) return
    return ctx
}
export default function Providers({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(true)
    const toggle = () => setOpen(prev => !prev)

    return (
        <SessionProvider>
            <SidebarContext.Provider value={{ open, toggle }}>
                <Provider store={store}>
                    <Toaster theme='light' richColors position='bottom-right' />
                    {/* removed the sidebar from here cuz then the login page was taking unnecessaryt white space because of flesx layout */}
                    {/* <div> */}
                    {/* <Sidebar /> */}
                    {children}
                    {/* </div> */}
                </Provider>
            </SidebarContext.Provider>
        </SessionProvider>
    )
}