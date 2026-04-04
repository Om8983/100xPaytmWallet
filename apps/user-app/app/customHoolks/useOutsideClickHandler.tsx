"use client";
import { Dispatch, RefObject, SetStateAction, useEffect } from "react"

type OutsideClickProps = {
    objRef: RefObject<HTMLDivElement | null>;
    isDropdown: boolean;
    setDropdown: Dispatch<SetStateAction<boolean>>;
}
export const useOutsideClickHandler = ({ objRef, isDropdown, setDropdown }: OutsideClickProps) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                objRef?.current &&
                !objRef?.current.contains(event.target as Node)
            ) {
                setDropdown(false)
            }
        }
        if (isDropdown) {
            document.addEventListener("mousedown", handleClickOutside)
        }

        // Cleanup
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [isDropdown, objRef, setDropdown])
}