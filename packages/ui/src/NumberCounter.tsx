'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface NumberCounterProps {
    from?: number;
    to: number;
    duration?: number;
    decimals?: number;
    className?: string;
    suffix?: string;
    prefix?: string;
}

export const NumberCounter = ({
    from = 0,
    to,
    duration = 2,
    decimals = 0,
    className = '',
    suffix = '',
    prefix = '',
}: NumberCounterProps) => {
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (!ref.current) return;

        const controls = {
            from,
            to,
        };

        const animation = (value: number) => {
            if (ref.current) {
                ref.current.textContent = `${prefix}${value.toFixed(decimals)}${suffix}`;
            }
        };

        let startTime: number | null = null;
        let animationFrameId: number;

        const animate = (currentTime: number) => {
            if (startTime === null) {
                startTime = currentTime;
            }

            const elapsed = (currentTime - startTime) / 1000;
            const progress = Math.min(elapsed / duration, 1);

            const current = controls.from + (controls.to - controls.from) * progress;
            animation(current);

            if (progress < 1) {
                animationFrameId = requestAnimationFrame(animate);
            }
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [from, to, duration, decimals, prefix, suffix]);

    return (
        <motion.span
            ref={ref}
            className={className}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            {prefix}
            {from}
            {suffix}
        </motion.span>
    );
}
