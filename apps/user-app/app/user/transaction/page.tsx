"use client";
import { Button } from '@repo/ui/button'
import React, { useState } from 'react'

export default function page() {
    const [loading, setLoading] = useState(false)
    const [amount, setAmount] = useState<Number>(0)
    const handleSendMoney = async () => {
    }
    return (
        <div className='ml-8 mt-5'>
            send money
            <form className='flex flex-col w-[8rem] gap-2 ml-16'>
                <input type="text" required placeholder='Enter Amount' />
                <select>
                    {/* <label htmlFor="">Select Bank</label> */}
                    <option value="HDFC">HDFC</option>
                    <option value="Axis">Axis</option>
                </select>
                <Button text='send' className='' loading={loading} handleClick={() => handleSendMoney()} />
            </form>
        </div>
    )
}
