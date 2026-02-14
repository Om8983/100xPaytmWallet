"use client";
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import iphoneImg from "../public/iphone.png"
import { Button } from '@repo/ui/button';
import { InputBox } from '@repo/ui/InputBox';
import { Label } from '@repo/ui/Label';
import { Errordiv } from '@repo/ui/Errordiv';
import { motion } from "motion/react"
import { toast } from 'sonner';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';

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
            router.push("/")
        }
    }, [session])

    const { handleSubmit, register, watch, formState: { errors, isValid } } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        mode: "all",
    })

    console.log("isValid", isValid)
    const [loading, setLoading] = useState(false)
    const variant = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut" } }
    }
    const handleSignIn = async (data: FormData) => {
        // destructuring the formdata
        const { email, phone, password } = data
        try {
            setLoading(true)
            const res = await signIn("credentials", { email, phone, password, redirect: false, callbackUrl: "/" });
            console.log("res", res)
            if (!res?.ok || res.status === 401) {
                toast.error("Invalid Credentials")
                setLoading(false)
                return
            }
        } catch (error) {
            toast.error("Internal Server Issue")
            setLoading(false)
            return
        }
    }

    const floatingDivs = 2;
    return (

        <div
            className='flex  justify-center items-center  gap-[12rem] w-screen h-[calc(100%-12rem)] '>
            {/* img for iphone */}
            <div className='relative'>
                <motion.div
                    initial={{ opacity: 1, }}
                    animate={{ y: -12, x: 0, opacity: 1 }}
                    transition={{
                        duration: 1.8,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "mirror",
                    }}
                    className='absolute glass-card top-20 z-10 -left-[5rem] w-[200px] h-[120px] border-[1px] border-neutral-300 '></motion.div>
                <motion.div
                    initial={{ opacity: 1, }}
                    animate={{ y: -12, x: 0, opacity: 1 }}
                    transition={{
                        duration: 1.8,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "mirror",
                    }}
                    className='absolute glass-card top-[20rem] z-10 -right-[5rem] w-[200px] h-[120px] border-[1px] border-neutral-300 '></motion.div>
                <motion.img
                    initial={{ y: 20, opacity: 1 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                    className='w-[260px] h-[510px]' src={iphoneImg.src} alt="" />
            </div>
            <form
                onSubmit={handleSubmit(handleSignIn)}
                className="flex flex-col  p-10 rounded-xl justify-center items-center gap-3 "
            >
                <div className="flex flex-col gap-2 mb-7">
                    <motion.h1
                        //@ts-ignore
                        variants={variant}
                        initial={'initial'}
                        animate={"animate"}
                        className="text-center font-[headbold] tracking-wider text-4xl">
                        Login To Your Account
                    </motion.h1>
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
                    isFormFilled={isValid}
                    className="mt-4"
                    loading={loading}
                    handleClick={() => { }}
                    text="Login"
                />
            </form>
        </div >
    )
}