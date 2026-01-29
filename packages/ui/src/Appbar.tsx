"use client";
import { Button } from "./button";
import { signOut, useSession } from "next-auth/react"
export const Appbar = () => {
    const handleLogout = () => {
        signOut({ callbackUrl: "/auth/signin" })
    }
    const session: any = useSession()


    return (
        <div className="w-full h-[40px] py-10 flex justify-between items-center px-8 border-b-[1px] shadow-md border-b-neutral-400 ">
            <div className="text-3xl font-bold">
                100xPaytm.
            </div>
            <Button appName="Logout" onClick={handleLogout}></Button>
        </div>
    )
} 