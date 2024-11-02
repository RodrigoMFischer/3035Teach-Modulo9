import union from '/assets/union.svg';
import { useNavigate } from 'react-router-dom';
import { remove } from '../../../utils/functions';
import { useState } from 'react';

function Logout(){
	const navigate = useNavigate();
	const [isHovered, setIsHovered] = useState(false);

	const handleLogout = () => {
		remove();
		navigate("/login");
	};

	return (
		<>
			<button 
				onClick={handleLogout} 
				className="flex items-center" 
				onMouseEnter={() => setIsHovered(true)} 
				onMouseLeave={() => setIsHovered(false)}
			>
				<img src={union} alt="Logout" className="w-6 h-6 mr-4" />
			</button>
			{isHovered && (
				<div className="absolute left-[-24px] top-[-30px] transform bg-custom-gray text-white text-sm py-1 px-2 rounded shadow-lg">
					Sair
				</div>
			)}
		</>
	);
	
}

export default Logout;