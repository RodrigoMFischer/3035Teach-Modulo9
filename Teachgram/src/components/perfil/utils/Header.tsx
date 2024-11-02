import { useUserContext } from "../../../context/UserContext";
import { User } from "../../../utils/interfaces";
import friends from "/assets/friends_check.svg";

interface HeaderProps {
	user: User | null;
}

export function Header({ user: headerUser }: HeaderProps){
	const { user: contextUser  } = useUserContext();
	return (
		<div className="lg:place-self-start flex lg:flex-row flex-col lg:items-center lg:space-x-[100px]">
			<img src={headerUser?.profileLink} alt={headerUser?.name} className="max-w-[150px] max-h-[150px] min-w-[150px] min-h-[150px] rounded-full self-center lg:mb-0 mb-[20px]"/>
			<div className="flex flex-col lg:items-start items-center justify-center">
				<h3 className="lg:text-2xl text-custom-black font-semibold lg:text-start text-center lg:mb-0 mb-2">{headerUser?.name}</h3>
				<span className="lg:mt-[18px] lg:text-xl text-custom-gray text-center lg:text-start lg:mb-0 mb-[20px]">{headerUser?.description}</span>
				{!(headerUser?.userId === contextUser?.userId) &&
					<div className="mt-[18px] lg:flex hidden items-center justify-center gap-2 border px-2 py-[2px] border-custom-gray rounded-lg">
						<span className="text-custom-gray text-base">Amigos</span>
						<img src={friends} className="text-custom-gray" />
					</div>
				}	
			</div>
		</div>
	);
}