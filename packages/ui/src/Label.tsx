"use client";
import { motion } from "motion/react"
type Props = {
    variant: { initial: any, animate: any }
    animate: string
    initial: string
    text: string
    forField: string
    className?: string
}
export const Label = ({ variant, className, animate, initial, text, forField }: Props) => {
    return (
        <motion.label  //@ts-ignore
            variants={variant}
            initial={initial}
            animate={animate}
            htmlFor={forField}
            className={`${className} mb-1 font-light text-sm`}>
            {text}
        </motion.label>
    )
}
