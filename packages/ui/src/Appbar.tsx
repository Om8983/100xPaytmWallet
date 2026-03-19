"use client";
import { useState } from "react";
import { Button } from "./button";
import { signOut, useSession } from "next-auth/react"
export const Appbar = () => {
    const session: any = useSession()
    const [loading, setLoading] = useState(false)

    return (
        <div className="w-full h-[40px] py-10 flex justify-between items-center px-8 border-b-[1px] shadow-md border-b-neutral-400 ">
            <div className="text-3xl font-bold">
                100xPaytm.
            </div>
            {session.status === "authenticated" &&
                <Button
                    text="Logout"
                    loading={loading}
                    handleClick={() => {
                        setLoading(true)
                        signOut({ callbackUrl: "/auth/signin" })
                        setLoading(false)
                    }}
                    className="w-[5rem]"
                ></Button>
            }

        </div >
    )
}