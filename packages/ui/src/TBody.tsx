type TBodyProps<T> = {
    body: T[],
    columns: {
        key: string,
        label: string
    }[]
    children: React.ReactNode
}
export const TBody = <T,>({ body, columns, children }: TBodyProps<T>) => {

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
                        {children}
                    </>
            }
        </tbody>
    )
}