'use client';
import { toLowerCase, z } from "zod"
import { Button } from '@repo/ui/button';
import { IconChevronDown, IconCircleCheck, IconCurrencyRupee, IconSend } from '@tabler/icons-react';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dropdown } from "@repo/ui/Dropdown/Dropdown";
import { DropdownItem } from "@repo/ui/Dropdown/DropdownItem";

interface TransferFormProps {
    onTransferComplete: () => void;
}

const PRESET_AMOUNTS = [500, 1000, 2000];

type AddMoneyData = {
    bankAcc: string;
    amount: number
}
type SendMoneyData = {
    phone: string;
    amount: number
}
const addMoneySchema = z.object({
    bankAcc: z.string().min(1, "Bank Account is required!"),
    amount: z.number().min(10, 'Amount must be greater than 0.'),
})
const sendMoneySchema = z.object({
    phone: z.string().min(1, "Phone is required!"),
    amount: z.number().min(10, 'Amount must be greater than 0.'),
})
export const TransferForm = ({ onTransferComplete }: TransferFormProps) => {
    const [activeTab, setActiveTab] = useState<'send' | 'add'>('send');
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const bankAccounts = [
        { value: 'hdfc', label: "HDFC" },
        { value: 'icici', label: "ICICI" }
    ]
    const [bankAccDrop, setBankAccDrop] = useState<boolean>(false)
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<any>({
        resolver: zodResolver(activeTab === 'add' ? addMoneySchema : sendMoneySchema),
        defaultValues: {
            bankAcc: "",
            phone: "",
            amount: 0
        }
    })

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        setShowSuccess(false);
        console.log("data", data);

        await new Promise((res) => setTimeout(res, 1000)); // simulate API

        setIsLoading(false);
        setShowSuccess(true);

        setTimeout(() => {
            setShowSuccess(false);
            onTransferComplete();
        }, 1500);
    };

    return (
        <div className="rounded-xl border border-border bg-card p-6 w-2/3">
            {/* Tab buttons */}
            <div className="flex gap-2 mb-6 border-b border-border">
                <button
                    onClick={() => setActiveTab('send')}
                    className={`px-4 py-3 text-sm font-medium transition-colors duration-200 border-b-2 -mb-px ${activeTab === 'send'
                        ? 'text-blue-800 border-blue-800'
                        : 'text-muted-foreground border-transparent hover:text-foreground'
                        }`}
                >
                    Send Money
                </button>
                <button
                    onClick={() => setActiveTab('add')}
                    className={`px-4 py-3 text-sm font-medium transition-colors duration-200 border-b-2 -mb-px ${activeTab === 'add'
                        ? 'text-blue-800 border-blue-800'
                        : 'text-muted-foreground border-transparent hover:text-foreground'
                        }`}
                >
                    Add Money
                </button>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5">
                {activeTab === 'send' ? (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                {...register('phone')}
                                placeholder="+1 (555) 123-4567"
                                className="w-full px-4 py-2.5 rounded-lg border border-border bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div
                            className='relative w-full' >
                            <button
                                type="button"
                                className="w-full px-4 flex items-center justify-between py-2.5 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                                onClick={() => setBankAccDrop(prev => !prev)}
                            >
                                {(() => {
                                    const selected = watch('bankAcc');
                                    const bank = bankAccounts.find(b => b.value === selected);
                                    return bank ? bank.label : "Select Your Bank Account";
                                })()} <IconChevronDown size={14} />
                            </button>
                            <Dropdown
                                className="w-[100%]"
                                show={bankAccDrop}
                                setShow={setBankAccDrop}
                            >
                                {
                                    bankAccounts.map((c: { value: string, label: string }) =>
                                        <DropdownItem
                                            key={c.value}
                                            itemHandler={() => {
                                                setValue('bankAcc', c.value)
                                                setBankAccDrop(false)
                                            }}
                                            className={`${watch('bankAcc') === c.value ? "bg-neutral-200 bg-opacity-50" : ""}`} >
                                            {c.label}
                                        </DropdownItem>
                                    )
                                }
                            </Dropdown>
                        </div>
                    </>
                )}

                <div>
                    <label className="block text-sm font-medium text-foreground mb-3">
                        Amount
                    </label>
                    <div className="relative mb-3">
                        <span className="absolute left-2 top-3.5 text-lg font-semibold text-primary"><IconCurrencyRupee size={20} /></span>
                        <input
                            type="number"
                            {...register('amount', { valueAsNumber: true })}
                            placeholder="0"
                            step="0.01"
                            min="0"
                            className="w-full pl-8 pr-4 py-2.5 rounded-lg border border-border bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
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

                {/* Fee breakdown */}
                <div className="bg-secondary/50 rounded-lg p-4 space-y-2 border border-border">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Amount</span>
                        <span className="font-medium text-foreground">${watch('amount') && watch('amount') > 0 ? Number(watch('amount')).toFixed(2) : '0.00'}</span>
                    </div>
                    {/* <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Fee</span>
                        <span className="font-medium text-foreground">${transferFee.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-border pt-2 flex justify-between">
                        <span className="font-medium text-foreground">Total</span>
                        <span className="font-bold text-lg text-primary">${totalAmount.toFixed(2)}</span>
                    </div> */}
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
                                : activeTab === 'add'
                                    ? "Add Money"
                                    : "Send Money"
                    }
                    disabled={isLoading}
                />
            </form>
        </div>
    );
}
