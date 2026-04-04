"use client";
import { AnimatePresence, motion } from "motion/react"
import { Dispatch } from "react"
type DropdownProps = {
    show: boolean;
    setShow: Dispatch<React.SetStateAction<boolean>>;
    className?: string;
    children: React.ReactNode
};
export const Dropdown = ({ show, setShow, className, children }: DropdownProps) => {

    return (
        <AnimatePresence mode='wait'>
            {
                show &&
                <motion.div
                    initial={{ y: 4, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 4, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeIn" }}
                    className={`absolute w-max right-0 -bottom-[6rem] flex flex-col gap-2 justify-start z-40 bg-white border-[1px] border-neutral-200 rounded-md py-2 px-1 shadow-md  ${className}`}>
                    {children}
                </motion.div>
            }
        </AnimatePresence>

    )
}