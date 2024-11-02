import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
    type: string;
    placeholder: string;
    id: string;
    initialValue?: any;
}

export function Input({ type, placeholder, id, initialValue = null, ...props }: InputProps, ref: React.Ref<HTMLInputElement>) {
    return(
        <input
            id={id}
            type={type} 
            placeholder={placeholder} 
            className="bg-white border boder-solid border-border-gray rounded-lg py-3 px-4 min-w-[300px]" 
            ref={ref}
            defaultValue={initialValue}
            {...props}
        />
    );
}

export const ForwardedInput = React.forwardRef(Input);