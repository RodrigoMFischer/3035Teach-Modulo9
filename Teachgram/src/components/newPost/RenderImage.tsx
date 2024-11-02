import { useState } from 'react';
import { SetDescription } from './SetDescription';
import close from '/public/assets/close.svg';

interface RenderImageProps {
	url: string;
	onClose: () => void;
}

export function RenderImage({ url, onClose }: RenderImageProps) {
	const [isNextStep, setNextStep] = useState(false);

	if (isNextStep) return <SetDescription url={url} onClose={onClose} />

	return (
		<div className="flex flex-col space-y-4 bg-white lg:py-[44px] lg:px-[54px] p-[30px] lg:rounded-[34px] rounded-[22px] lg:min-w-[528px] z-50">
			<button onClick={onClose} className='lg:w-auto lg:h-auto w-[9px] h-[9px]'>
				<img src={close} alt="Fechar modal" />
			</button>
			<div className="flex justify-between items-center">
				<h3 className="font-semibold lg:text-2xl text-base">Criar nova publicação</h3>
				<button 
					onClick={() => setNextStep(true)} 
					className="text-custom-red underline font-semibold lg:text-base text-xs"
				>
					Avançar
				</button>
			</div>
			<img src={url} alt="Nova publicação" className="mx-auto h-auto lg:max-w-[382px] max-w-[275px]" />
		</div>
	);
}
