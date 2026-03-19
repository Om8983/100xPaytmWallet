import React from 'react'
type BodyType = {
    body: {
        amount: string,
        txnId: string,
        status: string,
        startTime: string,
        endTime: string,
    }[]

}
export const TBody = ({ body }: BodyType) => {
    return (
        <tbody>
            {
                body?.map((data, index) => (
                    <tr key={data.txnId} className=' border-b hover:bg-neutral-100 '>
                        <td className='text-center px-3 py-2'>
                            {data?.amount}
                        </td>
                        <td className='text-center px-3 py-2'>
                            {data?.txnId}
                        </td>
                        <td className='text-center px-3 py-2'>
                            {data?.status}
                        </td>
                        <td className='text-center px-3 py-2'>
                            {data?.startTime}
                        </td>
                        <td className='text-center px-3 py-2'>
                            {data?.endTime}
                        </td>
                    </tr>
                ))
            }
        </tbody>
    )
}