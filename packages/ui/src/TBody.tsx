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
    const getStatusColor = (status: string) => {
        const currStatus = status.toLowerCase()
        if (currStatus === "success") {
            return "bg-[#d6f5ef] border-[#143c30] text-[#143c30]"
        }
        else if (currStatus === "pending") {
            return "bg-[#f7e0d0] border-[#143c30] text-[#143c30]"
        }
        else {
            return "bg-[#fddde2] border-[#68432d] text-[#68432d]"
        }
    }
    return (
        <tbody>
            {
                body?.map((data, index) => (
                    <tr key={data.txnId} className=' border-b hover:bg-neutral-50 '>
                        <td className='text-center px-3 py-2'>
                            {data?.amount}
                        </td>
                        <td className='text-center px-3 py-2'>
                            {data?.txnId}
                        </td>
                        <td className='text-center px-3 py-2'>
                            <div className={`rounded-2xl min-w-[120px] w-max py-[0.4rem] mx-auto text-[0.7rem] border-none ${getStatusColor(data.status)}`}>
                                {data?.status}
                            </div>
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