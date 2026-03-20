"use client"
import { motion } from 'motion/react'
import { ChangeEvent, Dispatch } from 'react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
type Props<T extends FieldValues> = { //this means whatever the form type i pass from useForm<T>(...). Path<T> means id must be a valid field name of that form
    type: string;
    id: Path<T>;  // why this??its a utility type in from RHF. T is just a generic here.
    placeholder: string;
    maxlength?: number;
    minlength?: number;
    register: UseFormRegister<T>;
    setValue?: Dispatch<React.SetStateAction<string>>
}
export const InputBox = <T extends FieldValues>({ type, id, placeholder, setValue, maxlength, minlength, register }: Props<T>) => {
    // const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     setValue?.(e.target.value)
    // }
    return (
        <motion.input
            initial={{ opacity: 0, }}
            animate={{ opacity: 1, }}
            transition={{ duration: 0.5, ease: "easeInOut", delay: 0.5 }}
            type={type}
            id={id}
            minLength={minlength}
            maxLength={maxlength}
            {...register(id)}
            className={`w-[280px] h-[40px] p-2 text-start text-sm font-[parareg] tracking-wider ring-[0.5px] placeholder:text-sm placeholder:font-[paralight] ring-gray-600 rounded-lg transition-transform delay-150 ease-in  focus-within:shadow-md focus-within:ring-gray-800 hover:ring-slate-600 outline-none`}
            placeholder={placeholder}
        // no need of onchange. Basically here onchange was overwriting the logic performed by the 'register'. It wasn't registering the dynamic values rather when a tab or any change has happened then only onchange ran which further stores the respective value. hence the here in case of login it wasn't working properly
        // onChange={handleOnChange}>
        >
        </motion.input>
    )
}
