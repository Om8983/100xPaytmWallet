"use client";
import { motion, spring } from "motion/react";
type Props = {
    children: React.ReactNode,
    id: string;
    className?: string;
    cardRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
    isWrapperHovered: boolean;
    glowPositions?: Record<string, { x: number; y: number }>;
    glowAngles: Record<string, number>;
    cardActive: Record<string, boolean>;
}


export const AmountCardContainer = ({ children, id, className, cardRefs, isWrapperHovered, glowPositions, glowAngles, cardActive }: Props) => {

    // these are the respective x and y positions of the mouse in teh wrapper.
    // const glow = glowPositions[id]

    const angle = glowAngles[id] ?? 0
    // const active = isWrapperHovered ? 1 : 0

    const SPREAD = 40  // arc width in degrees — how wide the glow window is
    const BORDER_WIDTH = "1px"
    const GRADIENT = `
    radial-gradient(circle, #e879f9 10%, transparent 20%),
    radial-gradient(circle at 40% 40%, #facc15 5%, transparent 15%),
    radial-gradient(circle at 60% 60%, #4ade80 10%, transparent 20%),
    radial-gradient(circle at 40% 60%, #38bdf8 10%, transparent 20%),
    repeating-conic-gradient(
        from 236.84deg at 50% 50%,
        #e879f9 0%,
        #facc15 calc(25% / 5),
        #4ade80 calc(50% / 5),
        #38bdf8 calc(75% / 5),
        #e879f9 calc(100% / 5)
    )
`
    // The conic arc mask — cuts a (SPREAD*2)deg window at current angle
    const arcMask = `conic-gradient(
                    from calc((${angle} - ${SPREAD}) * 1deg),
                    #00000000 0deg,
                    #fff,
                    #00000000 calc(${SPREAD} * 2deg)
                )`
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
                {/* <motion.div
                    className="absolute inset-0 rounded-2xl"
                    animate={{ opacity: isWrapperHovered && glow ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        background: glow ? `radial-gradient(300px circle at ${glow.x}px ${glow.y}px, rgba(147, 51, 234, 0.8), rgba(236, 72, 153, 0.4) 40%, transparent 70%)` : "none",
                        zIndex: 0,
                    }}
                /> */}
                <div
                    className="pointer-events-none absolute inset-0 rounded-[inherit]"
                    style={{ opacity: cardActive[id] ? 1 : 0, transition: "opacity 300ms" }}
                >
                    <motion.div
                        className="absolute inset-0 rounded-[inherit]"
                        style={{
                            // ::after equivalent — the gradient border
                            // sits outside by border-width, masked to show only the arc
                            inset: `calc(-1 * ${BORDER_WIDTH})`,
                            border: `${BORDER_WIDTH} solid transparent`,
                            background: GRADIENT,
                            backgroundAttachment: "fixed", // ← key: gradient is fixed to viewport so it bleeds across cards
                            borderRadius: "inherit",
                            maskClip: "padding-box, border-box",
                            maskComposite: "intersect",
                            // layer 1: hides everything inside padding-box
                            // layer 2: conic arc reveals only the slice on the border
                            maskImage: `linear-gradient(#0000, #0000), ${arcMask}`,
                            WebkitMaskClip: "padding-box, border-box",
                            WebkitMaskComposite: "xor", // safari equivalent of intersect
                            WebkitMaskImage: `linear-gradient(#0000, #0000), ${arcMask}`,
                        }}
                    />
                </div>
                <div
                    className={` absolute rounded-[calc(1rem-2px)] shadow-md p-5 overflow-hidden z-1 inset-[0.05rem] ${className} `}
                >
                    {children}
                    <motion.div
                        className="absolute inset-0 pointer-events-none"
                        // animate={{ opacity: isWrapperHovered && glow ? 1 : 0 }}
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