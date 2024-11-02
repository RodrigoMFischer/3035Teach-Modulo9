import { useParams } from "react-router-dom";
import { PerfilContent } from "../components/perfil/PerfilContent";
import { useUserContext } from "../context/UserContext";
import { useEffect, useState } from "react";
import { User } from "../utils/interfaces";
import { Loading } from "./Loading";

export function Profile() {
	const { user, fetchAllUsersInfo, friends } = useUserContext();
	const { id } = useParams<{ id: string }>();
	const [profileUser, setProfileUser] = useState<User | null>(null);

	useEffect(() => {
		const fetchProfileUser = async () => {
			if (!friends) {
				await fetchAllUsersInfo();
			}
			const selectedUser = id ? friends?.find((f) => f.userId === Number(id)) : user;
			setProfileUser(selectedUser || null);
		};

		fetchProfileUser();
	}, [id, friends, fetchAllUsersInfo]);

	return profileUser ? (
		<PerfilContent user={profileUser} />
	) : (
		<Loading />
	);
}