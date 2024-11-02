
interface ButtonSecondaryProps{
    type: "submit" | "button" | "reset";
    title: string;
    icon: string;
    alt: string;
}
export function ButtonSecondary({ type, title, icon, alt }: ButtonSecondaryProps){
    return(
        <button
            type={type}
            className="text-base poppins-regular py-3 rounded-lg bg-white shadow-md flex items-center 
            justify-center gap-x-[20px]"
        >
            <img src={ icon } alt={alt} />
            <span className="text-center text-base text-custom-border-input">{title}</span>
        </button>
    );
}