import React from 'react'
import Sidebar from '../../components/Sidebar';

function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className={`flex gap-2 p-3 w-screen h-screen`}>
            <Sidebar />
            {children}
        </div>
    )
}
export default layout;