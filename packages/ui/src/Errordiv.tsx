"use client";

import { FieldError } from "react-hook-form";

export const Errordiv = ({ error, errorText }: { error?: FieldError | boolean, errorText?: string }) => {
    return (
        <>
            {error &&
                <p className="text-sm font-paralight text-red-500 mt-2">
                    {errorText}
                </p>
            }
        </>
    )
}
