import { useEffect, useState } from "react";
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { PostAction } from "./PostAction";
import { Publications } from "../../../utils/interfaces";
import { useUserContext } from "../../../context/UserContext";

interface PublicationProps {
	fetchPosts: () => void;
	publications: Publications | null;
}

export function Publication( {fetchPosts, publications}: PublicationProps){
	const [activePostId, setActivePostId] = useState<number | null>(null);
	const { user } = useUserContext();

	useEffect(() => {
		fetchPosts();
	}, []);


	return (
		<div className="lg:w-3/4 w-full flex flex-col lg:items-start items-center lg:ml-8 ml-0 lg:mt-[70px] mt-0">
		   {publications && publications.content.length > 0 ? (
			publications.content.map((post, index) => (	
			  <div 
			  	key={post.postId} 
			  	className={`lg:max-w-[588px] lg:min-w-[588px] max-w-[300px] min-w-[300px] flex flex-col lg:gap-6 gap:3 lg:p-8 p-4 border-2 border-gray-300 rounded-lg lg:mb-[53px] mb-4 lg:mx-0 mx-1 
			  	${index === 0 ? 'lg:mt-0 mt-24' : ''}
				${index === publications.content.length - 1 ? 'lg:mb-0 mb-[100px]' : ''}
				`}
			
			  >
				<div className="flex items-center justify-between">
					<div className="flex items-center lg:gap-8 gap-4">
						<img className="rounded-full lg:w-[74px] w-[40px] lg:h-[74px] h-[40px]" src={post.profileLink} alt={`Foto de ${post.username}`}/>
						<div>
							<p className="text-btn-feed-gray lg:text-2xl text-xs lg:mb-2 mb-0">{post.username}</p>
							<span className="text-btn-feed-gray lg:text-xl text-[10px]">
								{formatDistanceToNow(new Date(post.createdAt), {addSuffix: true, locale: ptBR})}
							</span>
						</div>
					</div>
					{(user?.username === post.username.slice(0)) &&
						<div className="flex space-x-4">
							{activePostId === post.postId && <PostAction postId={post.postId} />}
							<button onClick={() => setActivePostId(activePostId === post.postId ? null : post.postId)}>
								<img src="/assets/more.svg" className="lg:h-auto h-3" />
							</button>
						</div>
					}
				</div>

				<p className="text-btn-feed-gray lg:text-xl text-xs lg:my-0 my-2">{post.description}</p>

				<img src={post.photoLink} alt={post.title} className="mx-auto h-auto lg:max-w-[300px] max-w-[150px] mt-1"/>

				<div className="flex items-center space-x-6 mt-1">
					<img className="lg:h-auto h-[20px]" src="/assets/feed-icons/like.svg" />
					<span className="text-[10px] lg:text-xl text-btn-feed-gray">{((Math.random() * 50) + 1).toFixed()}</span>
				</div>
			  </div>
			))
		  ) : (
			<p className="lg:text-base text-xs text-custom-black">Nenhuma publicação encontrada.</p>
		  )}
		</div>
	  );
}