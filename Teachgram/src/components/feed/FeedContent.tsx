import SideBar from "../Sidebar";
import { Deco } from "./utils/Deco";
import { Publication } from "./utils/Publication";
import { usePostContext } from "../../context/PostsContext";
import { useUserContext } from "../../context/UserContext";
import { Loading } from "../../pages/Loading";

export function FeedContent(){
	const { fetchPosts, publications, loading: loadingPosts } = usePostContext();
	const { user, loading: loadingUser } = useUserContext();

	if (loadingPosts && loadingUser) return <Loading />

	return(
		<>
			<main className="flex lg:w-10/12 max-w-screen lg:mx-auto w-full max-w-screen-lg mx-auto lg:pt-16 overflow-x-hidden">
				<SideBar user={user}/>
				<Publication fetchPosts={fetchPosts} publications={publications}/>
			</main>
			<div className="hidden lg:block">
				<Deco />
			</div>
		</>

	);
}