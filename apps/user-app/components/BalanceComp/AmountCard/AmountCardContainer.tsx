"use client";
import { motion } from "motion/react"
type Props = {
    children: React.ReactNode,
    containerStyles?: string,
    cardStyles?: string
}
export const AmountCardContainer = ({  children, cardStyles, containerStyles }: Props) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className={`border-none relative flex items-center justify-center ${containerStyles}`}>
            <div className={`absolute rounded-2xl lg:w-[400px] lg:h-[200px] border-[1px] z-0 `}></div>
            <div className={`${cardStyles} relative  z-10 sm:w-[100px] sm:h-[60px] lg:w-[380px] lg:h-[180px] rounded-[calc(1rem-0.4rem)] border-none outline-none shadow-md p-5`}>
                {children}
            </div>
        </motion.div>
    )
}