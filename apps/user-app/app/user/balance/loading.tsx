import React from 'react'
import { PageTopBar } from '../../../components/PageTopBar'
import { PageBaseUi } from '@repo/ui/PageBaseUi'

export default function loading() {
    const header = ["Amount", "Txn_Id", "Txn_Status", "Start Time", "End Time"]
    return (
        <PageBaseUi>
            <PageTopBar title="Balance" />
            <div className="flex-1 flex flex-col p-5 gap-3 ">
                <div className=" flex gap-2 items-center mb-3 ">
                    <div className={` bg-neutral-100 animate-pulse ml-3 w-[400px] h-[200px] rounded-md border-none outline-none p-5`}></div>
                    <div className={` bg-neutral-100 animate-pulse ml-3 w-[400px] h-[200px] rounded-md border-none outline-none p-5`}></div>
                    <div className={` bg-neutral-100 animate-pulse ml-3 w-[400px] h-[200px] rounded-md border-none outline-none p-5`}></div>
                </div>

                <table className="w-full rounded-md border overflow-scroll h-[44%] ">
                    <thead className='h-[38px] sticky top-0 border-b-2 overflow-auto border-b-neutral-200 bg-neutral-100 w-full'>
                        <tr className='text-left'>
                            {header?.map((title) => (
                                <th key={title} className="text-sm font-normal px-3 py-2 text-center">
                                    {title}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: 10 }).map((_, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className="border-b-[1px] border-neutral-100"
                            >
                                {Array.from({ length: 5 }).map((_, colIndex) => (
                                    <td key={colIndex} >
                                        <div
                                            className="h-[28px] w-[120px] my-2 mx-auto bg-[#e0e0e0] rounded-md "
                                            style={{
                                                animation: "pulse 1.5s ease-in-out infinite",
                                            }}
                                        ></div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </PageBaseUi>
    )
}
