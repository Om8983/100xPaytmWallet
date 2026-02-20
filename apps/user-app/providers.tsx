"use client";
import { store } from '@repo/redux'
import { SessionProvider } from 'next-auth/react';
import React from 'react'
import { Provider } from 'react-redux'
import { Toaster } from "sonner"

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <Provider store={store}>
                <Toaster theme='light' richColors position='bottom-right' />
                {children}
            </Provider>
        </SessionProvider>
    )
}



// .svg-masking {
//   -webkit-mask: url("/svgVector.svg") center / contain no-repeat,
//     linear-gradient(#000000 0 0);
//   mask-size: 7rem;
//   mask-position: bottom right;
//   mask-composite: exclude;
// } 