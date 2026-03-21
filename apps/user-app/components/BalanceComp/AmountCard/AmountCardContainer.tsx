"use client";
import { motion } from "motion/react";
type Props = {
    children: React.ReactNode,
    id: string;
    className?: string;
    cardRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
    isWrapperHovered: boolean;
    glowPositions: Record<string, { x: number; y: number }>;
}


export const AmountCardContainer = ({ children, id, className, cardRefs, isWrapperHovered, glowPositions }: Props) => {

    // these are the respective x and y positions of the mouse in teh wrapper.
    const glow = glowPositions[id]

    return (
        <>
            <motion.div
                key={id}
                ref={el => { cardRefs.current[id] = el }}
                className="relative lg:w-[400px] lg:h-[200px] sm:w-[100px] sm:h-[60px] rounded-2xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
            >
                {/* this will be glowed when hovered. */}
                <motion.div
                    className="absolute inset-0 rounded-2xl"
                    animate={{ opacity: isWrapperHovered && glow ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        background: glow ? `radial-gradient(300px circle at ${glow.x}px ${glow.y}px, rgba(147, 51, 234, 0.8), rgba(236, 72, 153, 0.4) 40%, transparent 70%)` : "none",
                        zIndex: 0,
                    }}
                />

                <div
                    className={` absolute rounded-[calc(1rem-2px)] shadow-md p-5 overflow-hidden z-1 inset-[0.18rem] ${className} `}
                >
                    {children}
                    <motion.div
                        className="absolute inset-0 pointer-events-none"
                        animate={{ opacity: isWrapperHovered && glow ? 1 : 0 }}
                        transition={{ duration: 0.5 }}
                    // style={{
                    //     // background: glow ? `radial-gradient(250px circle at ${glow.x}px ${glow.y}px, rgba(255,255,255,0.07), transparent 60%)` : "none",
                    //     // zIndex: 2,
                    // }}
                    />
                </div>
            </motion.div>
        </>
    )
}