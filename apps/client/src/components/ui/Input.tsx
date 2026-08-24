import type { ChangeEvent } from "react";

// props def

interface InputProps {
    value: any;
    placeholder?: string;
    type: 'text' | 'email' | 'password' | 'number';
    onChange: (e: ChangeEvent<HTMLInputElement>) => void; 
    className?: string;
}

// components

const Input = ({value, placeholder, type, onChange, className}:InputProps ) => {
    return (
        <input value={value} onChange={onChange} className={`${className}`} placeholder={placeholder} type={type}></input>
    )
} 

export default Input