"use client";

import { FieldError } from "react-hook-form";

export const Errordiv = ({ error, errorText }: { error?: FieldError, errorText?: string }) => {
    return (
        <>
            {error &&
                <p className="text-sm font-paralight text-pink-400 mt-2">
                    {errorText}
                </p>
            }
        </>
    )
}
