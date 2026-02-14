"use client";
import { motion, scale, useAnimationControls } from "motion/react";
import { useEffect } from "react";
interface ButtonProps {
  text: string;
  className?: string;
  loading: boolean;
  isFormFilled?: boolean;
  isLogin?: boolean;
  handleClick?: () => void;
}

export const Button = ({ text, className, loading, handleClick, isFormFilled, isLogin = false }: ButtonProps) => {
  const controls = useAnimationControls()
  useEffect(() => {
    controls.start({
      opacity: 1,
      transition: { duration: 0.5, ease: "easeInOut", delay: 0.5 }
    });
  }, []);
  return (
    <>
      <motion.button
        type="submit"
        initial={{ opacity: 0, }}
        animate={controls}
        // transition={{ duration: 0.5, ease: "easeInOut", delay: 0.6 }}
        transition={{
          type: "spring",
          stiffness: 600,
          damping: 50,
          mass: 0.025
        }}
        onClick={(e) => {
          if (!isFormFilled && isLogin) {
            controls.start({
              x: [0, 100, -100, 100, -100, 0],
              transition: { duration: 0.3, ease: "easeInOut" }
            },)
            return
          } else {
            handleClick?.()
          }
        }}
        disabled={loading}
        className={`w-[280px] h-[35px] text-center p-1 ring-1 ring-black rounded-lg hover:bg-neutral-100 transition ease-in-out bg-white text-black font-medium outline-none ${className} `}>
        <div className="flex items-center justify-center gap-2">
          <span className="font-[parareg]">
            {text}
          </span>
          {loading && (
            <motion.span
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 0.3, ease: "easeInOut", repeat: Infinity, }}
              className="inline-block w-[16px] h-[16px] border-2 border-black border-t-transparent rounded-full"
            ></motion.span>
          )}
        </div>
      </motion.button>
    </>
  );
}
