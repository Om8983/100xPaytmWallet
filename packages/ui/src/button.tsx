"use client";
import { ReactNode } from "react";

interface ButtonProps {
  children?: ReactNode;
  className?: string;
  appName: string;
  onClick: () => void;
}

export const Button = ({ children, className, appName, onClick }: ButtonProps) => {
  return (
    <button className={`border-2 rounded-md hover:bg-black hover:text-white py-2 border-black px-4 ${className}`} onClick={onClick}>{appName}</button>
  );
};
