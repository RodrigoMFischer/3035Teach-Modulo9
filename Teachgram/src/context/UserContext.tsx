import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { getUser, remove } from "../utils/functions";
import { User } from "../utils/interfaces";
import { NavigateFunction } from "react-router-dom";

interface UserContextProps {
    user: User | null;
    loading: boolean;
    error: string | null;
    fetchUserInfo: () => Promise<void>;
	fetchAllUsersInfo: () => Promise<User[] | null>;
	friends: User[] | null;
	updateUserInfo: (updatedData: Partial<User>) => Promise<void>;
	deleteUserAccount: (navigate: NavigateFunction) => Promise<void>;
}

const UserContext = createContext<UserContextProps | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
	const [friends, setFriends] = useState<User[] | null>(null);

    const fetchUserInfo = async () => {
		setLoading(true);
        try {
            const userCredentials = getUser();
            if (!userCredentials) return;
            
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userCredentials.id}`, {
                headers: {
                    "Authorization": `${userCredentials.token}`,
                    "Content-Type": "application/json"
                },
                method: "GET"
            });

            const userData = await response.json();
            setUser(userData);
            return userData;
        } catch (e) {
            setError('Ocorreu um erro durante a requisição');
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

	const updateUserInfo = async (updatedData: Partial<User>) => {
		setLoading(true);
        try {
            const userCredentials = getUser();
            if (!userCredentials || !user) return;

            const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userCredentials.id}`, {
                headers: {
                    "Authorization": `${userCredentials.token}`,
                    "Content-Type": "application/json"
                },
                method: "PUT",
                body: JSON.stringify({
                    ...user,
                    ...updatedData,
                    updatedAt: new Date().toISOString()
                }),
            });
			
            if (!response.ok) throw new Error('Falha ao atualizar usuário');
            const updatedUser = await response.json();
            setUser(updatedUser); 
        } catch (e) {
            setError('Ocorreu um erro ao atualizar os dados');
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

	const fetchAllUsersInfo = async (): Promise<User[] | null> => {
		setLoading(true);
		const userCredentials = getUser();
		if (!userCredentials) return null;
		try {
			const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
				headers: {
                    "Authorization": `${userCredentials.token}`,
                    "Content-Type": "application/json"
                }, method: 'GET'
			});

			const usersData = await response.json();
			const filteredUsers = usersData.filter((user: User) => user.userId !== userCredentials.id);
			setFriends(filteredUsers);
			return filteredUsers;			
		} catch (e) {
            setError('Ocorreu um erro durante a requisição');
            console.error(e);
			return null;
        } finally {
            setLoading(false);
		}
	}

	const deleteUserAccount = async (navigate: NavigateFunction) => {
		setLoading(true);
		try {
            const userCredentials = getUser();
            if (!userCredentials) return;

            const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userCredentials.id}`, {
                headers: {
                    "Authorization": `${userCredentials.token}`,
                },
                method: 'DELETE',
            });
			
			remove();
			navigate('/login');
		} catch (e) {
            console.error("Erro ao deletar conta de usuário");
            setError('Ocorreu um erro durante a requisição');
        } finally {
			setLoading(false);
		}
	}

    useEffect(() => {
        fetchUserInfo();
    }, []);

    return (
        <UserContext.Provider 
			value={{ user, loading, error, fetchUserInfo, fetchAllUsersInfo, friends, updateUserInfo, deleteUserAccount }}
		>
            {children}
        </UserContext.Provider>
    );
}

export function useUserContext() {
    const context = useContext(UserContext);
    if (!context) throw new Error("O UserContext deve estar encapsulado em um UserProvider");
    return context;
}
