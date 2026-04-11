'use client';
import { AnimatePresence, motion } from 'motion/react'

export const Tooltip = ({ title, className }: { title: string, className?: string }) => {
    return (
        // <AnimatePresence mode='wait'>
        <motion.div
            initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            exit={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`absolute border-2 bg-white rounded-md  px-2 py-1 text-base z-30 shadow-2xl ${className}`}>
            {title}
        </motion.div>
        // </AnimatePresence>
    )
}
