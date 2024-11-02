import { createdAtFormater } from "../../../utils/functions";
import likeIcon from '/assets/feed-icons/like.svg';

interface CardProps {
	profileImage: string;
	username: string;
	createdAt: string;
	description: string;
	image: string;
}

export function Card({...cardProps}: CardProps){

	return(
		<div className="flex flex-col items-start gap-y-6 py-8 px-7 rounded-lg shadow-lg">
			<div className="flex items-center gap-x-8">
				<img 
					className="rounded-full"
					src={cardProps.profileImage} 
					alt={`Perfil de @${cardProps.username}`} 
					height={74} 
					width={74}
				/>
				<div className="flex flex-col gap-y-2">
					<p className="text-2xl text-btn-feed-gray">@{cardProps.username}</p>
					<span className="text-xl text-btn-feed-gray">
						{createdAtFormater(cardProps.createdAt)}
					</span>
				</div>
			</div>
			<div className="flex flex-col items-start">
				<p className="text-xl text-btn-feed-gray mb-6">{cardProps.description}</p>
				<img 
					className="rounded-lg mb-7" 
					src={cardProps.image} 
					alt={`Imagem do post de @${cardProps.username}`} 
				/>
				<div className="flex items-center gap-x-6">
					<img src={likeIcon} alt="Ícone de Like" />
					<span 
						className="text-xl text-btn-feed-gray"
					>
						{Math.floor(Math.random() * 100) + 2} curtidas</span>
				</div>
			</div>

		</div>
	);
}