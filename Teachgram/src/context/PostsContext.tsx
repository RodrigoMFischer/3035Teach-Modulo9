import React, { createContext, useContext, useEffect, useState } from 'react';
import { getUser } from '../utils/functions';
import { NewPost, Publications } from '../utils/interfaces';

interface PostContextType {
    publications: Publications | null;
    loading: boolean;
    error: string | null;
    fetchPosts: () => Promise<void>;
    addPost: (postData: NewPost) => Promise<void>;
	deletePost: (postId: number) => Promise<void>;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [publications, setPublications] = useState<Publications | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchPosts = async () => {
		setLoading(true);
        try {
            const userCredentials = getUser();
            if (!userCredentials) return;

            const response = await fetch(`${import.meta.env.VITE_API_URL}/posts?page=0&size=50`, {
                headers: {
                    "Authorization": `${userCredentials.token}`,
                    "Content-Type": "application/json"
                },
                method: "GET"
            });

            if (!response.ok) throw new Error(response.status.toString());
            const posts = await response.json();
            setPublications(posts);
        } catch (e) {
            console.log(e);
            setError('Ocorreu um erro durante a requisição');
        } finally {
            setLoading(false);
        }
    };

    const addPost = async (postData: any) => {
		setLoading(true);
        try {
            const credentials = getUser();
            if (!credentials) return;

            const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/${credentials?.id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": credentials?.token
                },
                method: 'POST',
                body: JSON.stringify(postData)
            });

            if (!response.ok) throw new Error(response.status.toString());
            await fetchPosts();
        } catch (e) {
            console.log(e);
            setError('Ocorreu um erro durante a requisição');
        } finally {
            setLoading(false);
        }
    };

	const deletePost = async (postId: number) => {
		setLoading(true);
        try {
            const userCredentials = getUser();
            if (!userCredentials) return;

            const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/user/${userCredentials.id}`, {
                headers: {
                    "Authorization": `${userCredentials.token}`,
                    "Content-Type": "application/json",
                },
                method: 'DELETE',
            });

            if (!response.ok) throw new Error(response.status.toString());

            setPublications((prevPublications) => {
				if (!prevPublications) return null;
				const updatedContent = prevPublications.content.filter((post) => post.postId !== postId);
				return {
					...prevPublications,
					content: updatedContent,
					totalElements: prevPublications.totalElements ? prevPublications.totalElements - 1 : 0,
					totalPages: prevPublications.totalPages,
					page: prevPublications.page,
					size: prevPublications.size,
				};
			});
        } catch (e) {
            console.error("Erro ao deletar post");
            setError('Ocorreu um erro durante a requisição');
        } finally {
			setLoading(false);
		}
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <PostContext.Provider value={{ publications, loading, error, fetchPosts, addPost, deletePost }}>
            {children}
        </PostContext.Provider>
    );
};

export const usePostContext = () => {
    const context = useContext(PostContext);
    if (context === undefined) {
        throw new Error('usePostContext deve ser usado dentro de um PostProvider');
    }
    return context;
};
