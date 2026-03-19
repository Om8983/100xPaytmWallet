"use client";
import React from 'react'

export const PageBaseUi = ({
    children,
}: {
    children: React.ReactNode;
}) => {

    return (
        <div className="ring-2 relative overflow-hidden pb-5 bg-white flex flex-col ring-neutral-200 rounded-xl shadow-2xl w-full ">
            {children}
        </div>
    );
}