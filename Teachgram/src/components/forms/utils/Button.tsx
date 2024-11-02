interface ButtonProps{
    type: "submit" | "button" | "reset";
    title: string;
	disabled?: boolean;
}

export function Button({ type, title, disabled = false }: ButtonProps){
    return(
        <button 
            type={type}
            className="bg-custom-red rounded-[10px] text-white py-3 font-semibold text-xl shadow-md"
			disabled={disabled}
        >
            {title}
        </button>
    );
}