import React from 'react'
type DropItemProps = {
    children: React.ReactNode;
    className?: string;
    itemHandler?: () => void;
}
export const DropdownItem = ({ children, className, itemHandler }: DropItemProps) => {
    return (
        <button
            type='button'
            onClick={itemHandler}
            className={` w-full flex gap-2 items-center rounded-md  text-nowrap hover:bg-neutral-200 hover:bg-opacity-50 p-1 px-2 ${className}`}>
            {children}
        </button>
    )
}
