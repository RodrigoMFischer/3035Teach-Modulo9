import { useState } from "react";
import { Login, LoginResponse } from "../utils/interfaces"
import { useUserContext } from "../context/UserContext";

function useLogin(){
	const [error, setError] = useState<string | null>(null);
	const [data, setData] = useState<LoginResponse | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [login, setLogin] = useState<Login | null>(null);

	const { fetchUserInfo } = useUserContext();
	
	const fecthLogin = async ({ email, password }: Login) => {
		try{
			setLoading(true);
			const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
				body: JSON.stringify({
					email,
					password
				}), 
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				}
			});
			const json: LoginResponse = await response.json();
			
			if (json.message) {
				setError(json.message)
				setData(null);
			} else {
				setData(json)
				await fetchUserInfo();
			}
		} catch (e) {
			setError('Ocorreu um erro durante a requisição');
			console.error(e);
		} finally {
			setLoading(false);
		}
	};

	return {
		login,
		data,
		error,
		loading,
		fecthLogin
	};
}


export default useLogin;