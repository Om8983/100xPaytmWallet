// import nodatafound from "../public/nodatafound.jpg"
import Image from "next/image"
type TBodyProps = {
    body: {}[],
    columns: {
        key: string,
        label: string
    }[]
}
export const TBody = ({ body, columns }: TBodyProps) => {
    const getStatusColor = (status: string) => {
        const currStatus = status.toLowerCase()
        if (currStatus === "success") {
            return "bg-[#d6f5ef] border-[#143c30] text-[#143c30]"
        }
        // else if (currStatus === "pending") {
        //     return "bg-[#f7e0d0] border-[#143c30] text-[#143c30]"
        // }
        else {
            return "bg-[#fddde2] border-[#68432d] text-[#68432d]"
        }
    }

    return (
        <tbody>
            {
                (!body || body.length === 0) ?
                    <tr >
                        <td colSpan={columns.length} >
                            <img src="/nodatafound.png" alt="no data found" className="mx-auto" width={500} height={500} />
                        </td>
                    </tr>
                    :
                    <>
                        {
                            body.map((row: any) => (
                                <tr key={row?.txn_id} className='border-b hover:bg-neutral-50'>
                                    {columns.map(col => (
                                        <td key={col.key} className='text-center px-3 py-2'>
                                            {col.key === "txn_status"
                                                ? <div className={`rounded-2xl min-w-[120px] w-max py-[0.4rem] mx-auto text-[0.8rem] font-medium border-none ${getStatusColor(row.txn_status)}`}>{row[col.key]}</div>
                                                : row[col.key]
                                            }
                                        </td>
                                    ))}
                                </tr>
                            ))
                        }
                    </>
            }
        </tbody>
    )
}