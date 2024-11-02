export function RememberPass(){
    return(
        <div className="flex flex-row gap-x-2 items-center">
			<input
				id="remember" 
				type="checkbox"
				className="border-2 border-custom-red checked:bg-custom-red checked:border-custom-red focus:ring-0 cursor-pointer"
			/>
            <label
                htmlFor="remember"
                className="text-custom-gray"
            >
                Lembrar senha
            </label>
        </div>
    );
}