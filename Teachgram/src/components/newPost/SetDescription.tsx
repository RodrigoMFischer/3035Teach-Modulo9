import union from '/public/assets/union.svg';
import { RenderImage } from './RenderImage';
import { useState } from 'react';
import { SavePost } from './SavePost';

interface SetDescriptionProps{
	url: string;
	onClose: () => void
}

export function SetDescription({ url, onClose }: SetDescriptionProps){
	const [goBack, setGoBack] = useState(false);
	const [goAhead, setGoAhead] = useState(false);
	const [description, setDescription] = useState('');


	if (goBack) return <RenderImage url={url} onClose={onClose}/>
	if (goAhead) return <SavePost url={url} onClose={onClose} description={description}/>

	return (
		<div className="flex flex-col space-y-4 bg-white p-[30px] lg:py-[44px] lg:px-[54px] lg:rounded-[34px] rounded-[22px] lg:min-w-[528px] z-50">
			<button className='lg:w-auto lg:h-auto w-[9px] h-[9px]' onClick={() => setGoBack(true)}><img src={union} alt="Fechar modal" /></button>
			<div className="flex justify-between items-center">
				<h3 className="font-semibold lg:text-2xl text-base">Criar nova publicação</h3>
				<button 
					onClick={() => setGoAhead(true)}
					className="text-custom-red underline font-semibold lg:text-base text-xs"
				>
					Compartilhar
				</button>
			</div>
			<img src={url} alt="Nova publicação" className="mx-auto h-auto lg:max-w-[382px] max-w-[275px]"/>
			<input 
				onChange={(e) => setDescription(e.target.value)}
				type="text" 
				placeholder="Escreva uma legenda..." 
				className="border-none lg:text-xl text-base text-btn-feed-gray focus:outline-none"/>
		</div>
	);
}