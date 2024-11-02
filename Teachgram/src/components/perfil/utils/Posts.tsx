import { useEffect, useState } from "react";
import { usePostContext } from "../../../context/PostsContext";
import { Post, Publication } from "../../../utils/interfaces";
import { useUserContext } from "../../../context/UserContext";
import check from "/assets/friends_check.svg";

interface PostsProps {
	username: string
}

export function Posts({ username }: PostsProps){
	const { fetchPosts, publications } = usePostContext();
	const [posts, setPosts] = useState<Post[]>([]);
	const { user, friends } = useUserContext();

	useEffect(() => {
		const loadPosts = async () => {
			const userPosts = publications?.content.filter((p: Publication) => p.username.includes(username)) || [];
			setPosts(userPosts);
		}
		loadPosts();
	}, [fetchPosts, username]);

	return(
		<div className="flex flex-col gap-y-4 items-center">
			<div className="flex items-center justify-center gap-x-4">
				<p className="text-custom-gray text-center">
					<span className="block text-custom-black font-bold text-xl">
						{posts?.length !== undefined ? posts?.length : 0}
					</span>
						posts
					</p>
					<span className="block h-6 w-[1px] bg-[#DBDADA]"></span>
				<p className="text-custom-gray text-center">
					<span className="block text-custom-black font-bold text-xl">
						{friends ? friends.length : 0}
					</span>
					amigos
				</p>
				{!(user?.username.includes(username)) &&
					<div className="flex lg:hidden items-center justify-center gap-2 border px-2 py-	[2px] border-custom-gray rounded-lg">
						<span className="text-custom-gray text-base">Amigos</span>
						<img src={check} className="text-custom-gray font-medium" />
					</div>}	
			</div>
			<div className="flex flex-wrap gap-1 justify-start">
				{posts && posts.length > 0 ? (
					posts.map(p => (
						<img 
							className="
								lg:max-w-[280px] lg:min-w-[280px] lg:max-h-[280px] lg:min-h-[280px]
								max-w-[130px] min-w-[130px] max-h-[130px] min-h-[130px]
							" 
							key={p.postId} 
							src={p.photoLink} 
							alt={p.title}/>
					))
				) : (
					<p className="lg:text-base text-xs text-custom-black mt-8">Nenhum post encontrado.</p>
				)}
			</div>
        </div>
	);
}