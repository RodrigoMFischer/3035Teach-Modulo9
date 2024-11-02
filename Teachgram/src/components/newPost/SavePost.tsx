import close from '/public/assets/close.svg';
import { usePostContext } from '../../context/PostsContext';
import { NewPost } from '../../utils/interfaces';


interface SavePostProps{
	url: string;
	description: string;
	onClose: () => void;
}
export function SavePost({ url, onClose, description }: SavePostProps){
	const { addPost, loading } = usePostContext();

	const handleSave = async () => {
        const postData: NewPost = {
            title: 'Título do Post',
            description,
            photoLink: url,
            videoLink: 'null',
            isPrivate: false
        };

        await addPost(postData); 
        onClose();
    };

	return (
		<div className="flex flex-col space-y-4 bg-white lg:py-[44px] lg:px-[54px] p-[30px] lg:rounded-[34px] rounded-[22px] lg:min-w-[528px] z-50">
			<button className='lg:w-auto lg:h-auto w-[9px] h-[9px]' onClick={onClose}><img src={close} alt="Fechar modal" /></button>
			<div className="flex justify-between items-center">
				<h3 className="font-semibold lg:text-2xl text-base">Editar publicação</h3>
				<button 
					className="text-custom-red underline font-semibold lg:text-base text-xs" 
					onClick={handleSave}
					disabled={loading}
				>
					{loading ? 'Salvando...' : 'Salvar'}
				</button>
			</div>
			<img src={url} alt="Nova publicação" className="mx-auto h-auto lg:max-w-[382px] max-w-[275px]"/>
			<p className="lg:text-xl text-base text-btn-feed-gray">{description}</p>
		</div>
	);
}