import home from "/assets/feed-icons/home.svg";
import people from "/assets/feed-icons/people.svg";
import config from "/assets/feed-icons/config.svg";
import add from "/assets/feed-icons/add.svg";
import { LogoutContainer } from "./perfil/utils/LogoutContainer";
import { Button } from "./perfil/utils/Button";
import { Link } from "react-router-dom";
import ImageInput from "./newPost/ImageInput";
import { Friends } from "./friends/Friends";
import { useState } from "react";
import { User } from "../utils/interfaces";

interface SideBarProps {
	user: User | null;
	className?: string;
}

export default function SideBar({ user, className }: SideBarProps) {
  const [isModalToCreatePostOpen, setIsModalToCreatePostOpen] = useState(false);
  const [isModalToViewFriends, setIsModalToViewFriends] = useState(false);

  return (
    <div className={`flex lg:flex-col flex-row fixed lg:static bottom-0 w-full lg:w-1/4 bg-white shadow-lg lg:shadow-none lg:bg-transparent justify-around lg:justify-start gap-4 lg:gap-8 lg:shadow-none shadow-top ${className}`}>
	
      {isModalToViewFriends && <LogoutContainer className="lg:flex hidden"/>}
	  {!isModalToViewFriends && <LogoutContainer />}

      <div className="flex lg:flex-col flex-row lg:gap-4 w-full">
        <Link to="/feed" className="lg:block flex items-center justify-center w-full order-1">
          <Button icon={home} title="Feed"  />
        </Link>

		<div className="lg:block flex items-center justify-center w-full order-2">
			<Button icon={people} title="Amigos" onClick={() => setIsModalToViewFriends(true)}/>
		</div>
        
        <Link to="/perfil" className="lg:block flex items-center justify-center w-full order-5 lg:order-3">
          <Button isRounded={true} icon={user ? user.profileLink : ""} title="Perfil"  />
        </Link>
        
        <Link to="/configuracoes" className="lg:block flex items-center justify-center w-full order-4">
          <Button icon={config} title="Configurações"  />
        </Link>
        
        <div className="lg:block flex items-center justify-center w-full lg:order-5 order-3">
          <Button icon={add} title="Criar" onClick={() => setIsModalToCreatePostOpen(true)} />
        </div>

        {isModalToViewFriends && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <Friends onClose={() => setIsModalToViewFriends(false)} />
          </div>
        )}

        {isModalToCreatePostOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <ImageInput onClose={() => setIsModalToCreatePostOpen(false)} />
          </div>
        )}
      </div>
    </div>
  );
}
