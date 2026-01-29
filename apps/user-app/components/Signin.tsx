"use client";
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export const Signin = () => {
    const session = useSession()
    const router = useRouter()
    useEffect(() => {
        if (session.status === "authenticated") {
            router.push("/")
        }
    }, [session])
    const [email, setEmail] = useState<String>("")
    const [password, setPassword] = useState<String>("")


    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            signIn("credentials", { email, password, callbackUrl: "/" });
        }}
            className=' flex w-screen h-screen justify-center items-center '>
            <div className='flex  items-center flex-col gap-4 p-5 w-[250px] h-auto border-2 rounded-md'>
                <input type="text" className='w-[200px] border rounded-sm p-1 outline-none' placeholder='Enter Email' onChange={(e: any) => setEmail(e.target.value)} />
                <input type="text" className='w-[200px] border rounded-sm p-1 outline-none' placeholder='***********' max={8} onChange={(e: any) => setPassword(e.target.value)} />
                <button
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                        }
                    }}
                    type='submit'
                    className='cursor-pointer border py-1 px-3 rounded-md' >
                    SignIn
                </button>
            </div>
        </form >
    )
}