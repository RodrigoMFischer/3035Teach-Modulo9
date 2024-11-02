import { useState } from "react";
import close from '/public/assets/close.svg';
import { RenderImage } from "./RenderImage";

interface ImageInputProps {
	onClose: () => void;
}

export default function ImageInput({ onClose }: ImageInputProps) {
	const [imageUrl, setImageUrl] = useState<string>("");
	const [inputValue, setInputValue] = useState<string>("");
	const [isImageRendered, setIsImageRendered] = useState<boolean>(false); 

	const handleBlur = () => {
		setImageUrl(inputValue);
		setIsImageRendered(true);
	}

	if (isImageRendered) {
		return <RenderImage url={imageUrl} onClose={() => setIsImageRendered(false)} />; 
	}

	return (
		<div className="flex flex-col lg:space-y-[68px] space-y-[50px] bg-white lg:py-[44px] lg:px-[54px] p-[30px] lg:rounded-[34px] rounded-[22px] lg:min-w-[528px]">
			<div className="flex lg:flex-row flex-col-reverse justify-between lg:items-center items-start gap-2">
				<h3 className="font-semibold lg:text-2xl text-base">Criar nova publicação</h3>
				<button onClick={onClose} className="lg:w-auto lg:h-auto w-[9px] h-[9px]">
					<img src={close} alt="Fechar modal"/>
				</button>
			</div>
			<div className="flex relative">
				<label className="bg-red-400 text-white px-4 py-2 rounded-lg whitespace-nowrap z-10">
					{window.innerWidth < 1024 ? "Link" : "Link da imagem"}
				</label>
				<input
					className="truncate bg-transparent text-base border-2 border-custom-red rounded-r-lg px-4 py-2 text-gray-500 focus:outline-none focus:border-custom-red focus:ring-custom-red lg:w-full -ml-2"
					type="text"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					onBlur={handleBlur}
					placeholder="Insira aqui a URL da imagem"
				/>
			</div>
		</div>
	);
}
