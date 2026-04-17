'use client';
import { z } from "zod"
import { Button } from '@repo/ui/button';
import { IconCircleCheck, IconCurrencyRupee, IconSend, IconX, IconZoomExclamationFilled } from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { confirmPeerTransfer, peerTransfer } from "../../app/actions/transaction/action";
import { toast } from "sonner";
import { useDebounce } from "../../app/customHoolks/useDebounce";
import { getUserPhone } from "../../app/actions/user/action";
import { AnimatePresence, motion } from "motion/react"
import { InputBox } from "@repo/ui/InputBox"
import { Label } from "@repo/ui/Label";
import { useOutsideClickHandler } from "../../app/customHoolks/useOutsideClickHandler";

const PRESET_AMOUNTS = [500, 1000, 2000];

const peerTransferSchema = z.object({
    phone: z.string().min(10, "Phone Number is required!").max(10),
    amount: z.number().min(1, 'Amount must be greater than 0.'),
})

type UserPhoneNameType = {
    email: string;
    phoneNumber: string;
    id: string
}
export const PeerTransferForm = () => {
    const [users, setUsers] = useState<UserPhoneNameType[] | []>([])
    // receiver id state to pass to the server action while sending payment to the user from wallet
    const [receiverId, setReceiverId] = useState<string | null>(null)
    // state to show phone searching dropdown
    const [showPhoneDrop, setShowPhoneDrop] = useState<boolean>(false)

    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm<any>({
        resolver: zodResolver(peerTransferSchema),
        mode: 'onChange'
    })

    const phoneDropRef = useRef(null)
    useOutsideClickHandler({
        objRef: phoneDropRef,
        isDropdown: showPhoneDrop,
        setDropdown: setShowPhoneDrop
    })


    const receiverPhone = watch('phone')
    const { resultValue } = useDebounce(receiverPhone, 100)

    useEffect(() => {
        (async () => {
            if (resultValue?.trim() === "") return
            try {

                const res = await getUserPhone(resultValue)
                if (!res) setUsers([])
                setUsers(res.user)

            } catch (error) {

                setUsers([])
                return

            }
        })()
    }, [resultValue])

    useEffect(() => {
        if (receiverPhone?.trim()?.length === 0) {
            setShowPhoneDrop(false)
            return
        }
        setShowPhoneDrop(true)
    }, [receiverPhone])

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        setShowSuccess(false);

        const payload = {
            amount: data.amount,
            receiverId: receiverId
        }

        try {
            const { success, msg, paymentId }: { success: boolean, msg: string, paymentId: string | null } = await peerTransfer(payload)
            if (!success) {
                setIsLoading(false);
                setShowSuccess(false);
                reset()
                toast.error("Payment Unsuccesfull!")
                return
            }

            const { success: paymentStatus, msg: txn_msg }: { success: boolean, msg: string } = await confirmPeerTransfer({ paymentId: paymentId })
            if (!paymentStatus) {
                setIsLoading(false);
                setShowSuccess(false);
                toast.error("Payment Unsuccesfull!")
                return
            }
            reset()
            setShowSuccess(true)
            setIsLoading(false)
            setTimeout(() => {
                setShowSuccess(false);
            }, 2000);
            toast.success("Payment Success!")
        } catch (error) {
            setIsLoading(false);
            setShowSuccess(false);
            toast.error("Internal Server Error.")
            return
        }
    };


    return (
        <div className="rounded-xl border border-border p-6 w-2/3">
            {/* Tab buttons */}
            <div className="flex gap-2 mb-6 border-b border-border">
                <button
                    onClick={() => {
                        reset()
                    }}
                    className={`px-4 py-3 text-sm font-medium transition-colors duration-200 border-b-2 -mb-px
                         text-blue-800 border-blue-800
                        }`}
                >
                    Send Money
                </button>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5">
                <div className="relative">
                    <Label animate="" initial="" text='Phone Number' forField='phone' className=" font-medium text-foreground text-base" />
                    <div className="relative mb-3">
                        <InputBox
                            type="text"
                            register={register}
                            id="phone"
                            placeholder="ex : 1234567890"
                            className="w-full"
                            value={watch('phone') ?? ""}
                        />
                        <p
                            className="absolute right-4 top-3"
                            onClick={() => setValue('phone', '')}
                        >
                            <IconX size={20} stroke={1} className="hover:stroke-2 cursor-pointer" />
                        </p>
                    </div>
                    <AnimatePresence mode="wait">
                        {
                            showPhoneDrop &&
                            <motion.div
                                ref={phoneDropRef}
                                initial={{ opacity: 0, scale: 0.8, filter: "blur(6px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                exit={{ opacity: 0, scale: 0.8, filter: "blur(6px)" }}
                                className="absolute flex flex-col gap-3 px-2 py-4 overflow-y-scroll scroll-smooth  text-sm w-full justify-center items-start min-h-[40px] max-h-[140px] shadow-xl bg-white rounded-xl top-[5.5rem] z-30 border-[1px] border-neutral-100">
                                {
                                    users?.length === 0 ?
                                        <span className="flex gap-2 items-center text-base"> <IconZoomExclamationFilled size={22} className=" drop-shadow-lg" color="#7684f1" /> No contact found</span>
                                        :
                                        users?.map((user) => (
                                            <div
                                                key={user.id}
                                                className={`w-full p-2 rounded-md flex justify-start items-center gap-2 hover:bg-black/5`}
                                                onClick={() => {
                                                    setReceiverId(user.id)
                                                    setValue("phone", user.phoneNumber)
                                                    setShowPhoneDrop(false)
                                                }}
                                            >
                                                <div className='w-10 h-10 rounded-full border-[1px]'></div>
                                                <div className="flex flex-col items-start justify-center">
                                                    <p className="text-sm ">{user.phoneNumber}</p>
                                                    <p className="text-xs">{user.email}</p>
                                                </div>
                                            </div>
                                        ))
                                }
                            </motion.div>
                        }
                    </AnimatePresence>
                </div>

                <div>
                    <Label animate="" initial="" text='Amount' forField='amount' className=" font-medium text-foreground text-base " />
                    <div className="relative mb-3">
                        <span className="absolute left-2 top-[0.7rem] text-lg font-semibold text-primary"><IconCurrencyRupee size={20} /></span>
                        <InputBox
                            type="number"
                            register={register}
                            id="amount"
                            placeholder="0"
                            className="w-full pl-8 "
                            value={watch('amount') ?? ""}
                        />
                    </div>

                    {/* Preset amounts */}
                    <div className="flex gap-2">
                        {PRESET_AMOUNTS.map((preset) => (
                            <button
                                key={preset}
                                type="button"
                                onClick={() => setValue('amount', preset)}
                                className="flex px-3 py-2 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-black transition-all duration-200 hover:text-white"
                            >
                                ${preset}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-secondary/50 rounded-lg p-4 space-y-2 border border-border">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Amount</span>
                        <span className="font-medium text-foreground">${watch('amount') && watch('amount') > 0 ? Number(watch('amount')).toFixed(2) : '0.00'}</span>
                    </div>
                </div>

                {/* Submit button */}
                <Button
                    isLogin={false}
                    icon={showSuccess ? <IconCircleCheck className="h-4 w-4" /> : <IconSend className="h-4 w-4" />}
                    className={`mt-4 w-[280px] tracking-wide bg-black text-white hover:bg-black/85 ${isLoading ? "bg-black/85" : ""}`}
                    loading={isLoading}
                    text={
                        isLoading
                            ? "Processing..."
                            : showSuccess
                                ? "Success"
                                : "Send Money"
                    }
                    disabled={isLoading}
                />
            </form>
        </div>
    );
}