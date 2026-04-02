'use client';

import { Button } from '@repo/ui/button';
import { IconCircleCheck, IconSend } from '@tabler/icons-react';
import { useState } from 'react';

interface TransferFormProps {
    onTransferComplete: () => void;
}

const PRESET_AMOUNTS = [500, 1000, 2000];

export const TransferForm = ({ onTransferComplete }: TransferFormProps) => {
    const [activeTab, setActiveTab] = useState<'send' | 'add'>('send');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [selectedBank, setSelectedBank] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setShowSuccess(true);
        setTimeout(() => {
            setPhoneNumber('');
            setAmount('');
            setSelectedBank('');
            setShowSuccess(false);
            setIsLoading(false);
            onTransferComplete();
        }, 1500);
    };

    const isSendValid = activeTab === 'send' ? (phoneNumber.trim() && amount && parseFloat(amount) > 0) : false;
    const isAddValid = activeTab === 'add' ? (selectedBank && amount && parseFloat(amount) > 0) : false;
    const isFormValid = isSendValid || isAddValid;
    const transferFee = parseFloat(amount) > 0 ? 0.5 : 0;
    const totalAmount = parseFloat(amount) + transferFee || 0;

    return (
        <div className="rounded-xl border border-border bg-card p-6 w-2/3">
            {/* Tab buttons */}
            <div className="flex gap-2 mb-6 border-b border-border">
                <button
                    onClick={() => setActiveTab('send')}
                    className={`px-4 py-3 text-sm font-medium transition-colors duration-200 border-b-2 -mb-px ${activeTab === 'send'
                        ? 'text-primary border-primary'
                        : 'text-muted-foreground border-transparent hover:text-foreground'
                        }`}
                >
                    Send Money
                </button>
                <button
                    onClick={() => setActiveTab('add')}
                    className={`px-4 py-3 text-sm font-medium transition-colors duration-200 border-b-2 -mb-px ${activeTab === 'add'
                        ? 'text-primary border-primary'
                        : 'text-muted-foreground border-transparent hover:text-foreground'
                        }`}
                >
                    Add Money
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                {activeTab === 'send' ? (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="+1 (555) 123-4567"
                                className="w-full px-4 py-2.5 rounded-lg border border-border bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Select Bank Account
                            </label>
                            <select
                                value={selectedBank}
                                onChange={(e) => setSelectedBank(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                            >
                                <option value="">Choose a bank account</option>
                                <option value="bank1">Chase Checking ••••5432</option>
                                <option value="bank2">Wells Fargo Savings ••••8901</option>
                                <option value="bank3">Bank of America ••••3456</option>
                            </select>
                        </div>
                    </>
                )}

                <div>
                    <label className="block text-sm font-medium text-foreground mb-3">
                        Amount
                    </label>
                    <div className="relative mb-3">
                        <span className="absolute left-4 top-2.5 text-lg font-semibold text-primary">$</span>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
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
                                onClick={() => setAmount(preset.toString())}
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
                        <span className="font-medium text-foreground">${parseFloat(amount) > 0 ? parseFloat(amount).toFixed(2) : '0.00'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Fee</span>
                        <span className="font-medium text-foreground">${transferFee.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-border pt-2 flex justify-between">
                        <span className="font-medium text-foreground">Total</span>
                        <span className="font-bold text-lg text-primary">${totalAmount.toFixed(2)}</span>
                    </div>
                </div>

                {/* Submit button */}
                <Button
                    isLogin={true}
                    icon={showSuccess ? <IconCircleCheck className="h-4 w-4" /> : <IconSend className="h-4 w-4" />}
                    // isFormFilled={isValid}
                    disabled={!isFormValid || isLoading || showSuccess}
                    className={`mt-4 w-[280px] tracking-wide bg-black text-white hover:bg-black/85 ${isLoading ? "bg-black/85" : ""}`}
                    loading={isLoading}
                    // handleClick={() => { }}
                    text={isLoading ? showSuccess ? "Success" : "Processing" : "Success"}
                />
            </form>
        </div>
    );
}
