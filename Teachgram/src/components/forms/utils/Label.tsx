interface LabelProps {
    htmlFor: string;
    title: string;
}

export function Label({htmlFor, title}: LabelProps){
    return(
        <label 
            htmlFor={htmlFor}
            className="text-base text-custom-gray"
        >
            {title}
        </label>
    );
}