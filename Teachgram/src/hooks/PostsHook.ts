import {  useState } from "react";
import { getUser } from "../utils/functions";
import { Post } from "../utils/interfaces";
import { useUserContext } from "../context/UserContext";

function usePosts(){
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [posts, setPosts] = useState<Post[] | null>(null);

	const { user, loading: userLoading } = useUserContext();

	const fetchPosts = async () => {

		if (!user || userLoading) return;

		try{
			setLoading(true);
			const userCredentials = getUser();
			if(!userCredentials) return;
			const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/user/${userCredentials.id}`, {
				headers: {
					"Authorization": `${userCredentials.token}`,
					"Content-Type": "application/json"
				},
				method: "GET"
			});

			if(!response.ok) throw new Error(response.status.toString());
			
			const posts = await response.json();
			setPosts(posts);
			return posts;
		} catch(e) {
			console.log(e);
			setError('Ocorreu um erro durante a requisição');
		} finally {
			setLoading(false);
		}
	}

	return {
        error,
        loading,
        fetchPosts,
		posts
    };
}

export default usePosts;