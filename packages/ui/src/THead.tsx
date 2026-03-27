export const THead = ({ header }: { header: string[] }) => {
  return (
    <thead className='h-[38px] sticky top-0 border-b-2 overflow-auto border-b-neutral-200 bg-neutral-100 w-full'>
      <tr className='text-left'>
        {header?.map((title) => (
          <th key={title} className="text-sm font-normal px-3 py-3 text-center">
            {title}
          </th>
        ))}
      </tr>
    </thead>
  )
}