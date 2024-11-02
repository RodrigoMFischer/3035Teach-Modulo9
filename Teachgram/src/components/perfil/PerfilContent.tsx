import { Header } from "./utils/Header";
import { Posts } from "./utils/Posts";
import SideBar from "../Sidebar";
import { User } from "../../utils/interfaces";
import { Link, useNavigate } from "react-router-dom";
import config from "/assets/feed-icons/config.svg";
import union from "/assets/union.svg";

interface PerfilContentProps {
	user: User | null
}
export function PerfilContent({ user }: PerfilContentProps){
	const navigate = useNavigate();
    return(
        <main className="lg:w-10/12 w-full mx-auto lg:mt-16 mt-4 flex lg:justify-between justify-center items-center">
			<SideBar user={user} className="hidden lg:block lg:space-y-8 "/>
			<div className="w-3/4 flex flex-col gap-4">
				<div className="lg:hidden flex justify-between items-center">
					<button onClick={() => navigate(-1)} className="max-w-3"><img src={union} /></button>
					<Link to="/configuracoes" className="max-w-4"><img src={config} /></Link>
				</div>
				<Header user={user}/>
				<Posts username={ user ? user.username : ''  }/>
			</div>
        </main>
    );
}