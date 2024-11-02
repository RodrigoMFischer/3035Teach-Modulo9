import { useState } from "react";
import { Register } from "../utils/interfaces";
import { useNavigate } from "react-router-dom";

function useRegister(){
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const navigate = useNavigate();

	const fetchRegister = async ({...data}: Register) => {
		try{
			setLoading(true);
			const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
				headers: {
					"Content-Type": "application/json"
				},
				method: "POST",
				body: JSON.stringify({
					name: data.name,
					username: data.username,
					email: data.email,
					password: data.password,
					phone: data.phone,
					description: data.description,
					profileLink: data.profileLink,
					deleted: data.deleted
				})
			});

			console.log(await response.json());

			if (response.ok) navigate('/login');
		} catch(e) {
			setError('Ocorreu um erro durante a requisição');
			console.error(e);
		} finally {
			setLoading(false);
		}
	}

	return {
		error,
		loading,
		fetchRegister
	};
}

export default useRegister;