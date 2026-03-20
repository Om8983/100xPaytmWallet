"use client";

export const THead = ({ header }: { header: string[] }) => {
  return (
    <thead className='h-[38px] sticky top-0 overflow-auto border-b-2 border-b-neutral-500 bg-[#f6f7fb] w-full'>
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