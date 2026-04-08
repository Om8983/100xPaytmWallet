"use client";
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Button } from '@repo/ui/button';
import { InputBox } from '@repo/ui/InputBox';
import { Label } from '@repo/ui/Label';
import { Errordiv } from '@repo/ui/Errordiv';
import { motion } from "motion/react"
import { toast } from 'sonner';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import google from "../public/google.svg"
import { IconLogin } from '@tabler/icons-react';
type FormData = {
    email: string
    phone: string
    password: string
}
const formSchema = z.object({
    email: z.string().min(1, "Email is required !"),
    phone: z.string().min(10, 'Phone is required !').max(10),
    password: z.string().min(8, "Password is required !")
})
export const Signin = () => {
    const session = useSession()
    const router = useRouter()
    useEffect(() => {
        if (session.status === "authenticated") {
            router.push("/user/dashboard")
        }
    }, [session])

    const { handleSubmit, register, watch, formState: { errors, isValid } } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        mode: 'onChange'
    })

    const [loading, setLoading] = useState(false)
    const [sameEmailPass, setSameEmailPass] = useState(false)
    const variant = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut" } }
    }
    const handleSignIn = async (data: FormData) => {
        // destructuring the formdata
        const { email, phone, password } = data
        try {
            setLoading(true)
            setSameEmailPass(false)
            const res = await signIn("credentials", { email, phone, password, redirect: false, callbackUrl: "/user/dashboard" });
            if (!res?.ok || res.status === 401) {
                toast.error("Invalid credentials !")
                setSameEmailPass(true)
                setLoading(false)
                return
            }
        } catch (error) {
            toast.error("Internal Server Issue")
            setLoading(false)
            return
        }
    }
    return (

        <div
            className='flex h-screen justify-center items-center  bg-[linear-gradient(90deg,hsla(216,100%,50%,1)_0%,hsla(220,100%,79%,1)_100%)]  gap-[12rem] w-screen  '>
            <div className='flex w-[calc(100%-50rem)] gap-10 p-5 bg-white shadow-2xl rounded-xl'>
                <form
                    onSubmit={handleSubmit(handleSignIn)}
                    className="flex flex-col p-10 rounded-xl justify-center items-center gap-3"
                >
                    <div className="flex flex-col gap-2 mb-7">
                        <motion.h1
                            //@ts-ignore
                            variants={variant}
                            initial={'initial'}
                            animate={"animate"}
                            className="text-center font-semiBold  text-4xl">
                            Login To Your Account
                        </motion.h1>
                        <Errordiv error={sameEmailPass} errorText='Email or Phone already exists!' />
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col">
                            <Label variant={variant} animate='animate' initial='initial' text='Email' forField='email' />
                            <InputBox
                                type="email"
                                register={register}
                                id="email"
                                placeholder="example@gmail.com" />
                            <Errordiv
                                error={errors?.email}
                                errorText={errors.email?.message}
                            />
                        </div>
                        <div className="flex flex-col">
                            <Label variant={variant} animate='animate' initial='initial' text='Phone' forField='phone'></Label>
                            <InputBox
                                type='text'
                                register={register}
                                id="phone"
                                maxlength={10}
                                minlength={10}
                                placeholder="ex: 1234567890"
                            />
                            <Errordiv
                                error={errors?.phone}
                                errorText={errors.phone?.message} />
                        </div>

                        <div className="flex flex-col">
                            <Label variant={variant} animate='animate' initial='initial' text='Password' forField='password' />
                            <InputBox
                                type="password"
                                register={register}
                                id="password"
                                placeholder="********"
                            />
                            <Errordiv
                                error={errors?.password}
                                errorText={errors.password?.message}
                            />
                        </div>
                    </div>

                    <Button
                        isLogin={true}
                        icon={<IconLogin size={20} />}
                        isFormFilled={isValid}
                        className={`mt-4 w-[280px] tracking-wide bg-black text-white hover:bg-black/85 ${loading ? "bg-black/85" : ""}`}
                        loading={loading}
                        handleClick={() => { }}
                        text="Login"
                    />
                    <div className=' w-full flex  items-center justify-center gap-2'>
                        <hr className='h-[1.5px] w-full bg-black' />
                        <p>OR</p>
                        <hr className='h-[1.5px] w-full bg-black' />
                    </div>
                    <div className='bg-white ring-2 ring-neutral-50 shadow-xl rounded-md p-3'>
                        <img
                            src={google.src}
                            alt="google"
                            className="w-10 h-10" />
                    </div>
                </form>
                <div className='flex-1 bg-blue-700 rounded-xl '>
                </div>
            </div>
        </div >
    )
}