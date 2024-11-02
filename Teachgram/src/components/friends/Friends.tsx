import close from '/public/assets/close.svg';
import { useUserContext } from '../../context/UserContext';
import { useEffect, useState } from 'react';
import { User } from '../../utils/interfaces';
import { Link } from 'react-router-dom';
import { Pagination } from './Pagination';
import union from '/assets/union.svg';	
import loadingLogo from '/assets/loading_logo.svg';	
import { Loading } from '../../pages/Loading';

interface FriendsProps {
	onClose: () => void;
}

export function Friends({ onClose }: FriendsProps){
	const [friends, setFriends] = useState<User[] | null>(null);
	const { fetchAllUsersInfo, loading } = useUserContext();
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(4);

	useEffect(() => {
		const fetchFriends = async () => {
			const users = await fetchAllUsersInfo();
			setFriends(users);
		};
		fetchFriends();
	}, []);

	useEffect(() => {
        const updateItemsPerPage = () => {
            setItemsPerPage(window.innerWidth < 1024 ? 9 : 4);
        };

        updateItemsPerPage(); 
        window.addEventListener('resize', updateItemsPerPage);
        
        return () => window.removeEventListener('resize', updateItemsPerPage);
    }, []);

	const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const selectedFriends = friends?.slice(startIndex, startIndex + itemsPerPage);

	if (loading) return <div className='z-50 w-full'><Loading /></div>

	return (
		<div className="relative z-50 flex flex-col bg-white py-[44px] lg:px-[54px] px-[45px] lg:rounded-[34px] lg:max-w-[528px] lg:h-auto h-screen w-full">
			<button 
				className='lg:hidden block h-3 w-3'
				onClick={onClose}
				>
				<img src={union}/>
			</button>
			<img src={loadingLogo} className='lg:hidden block h-[39px] w-[39px] place-self-end' />
			<button onClick={onClose} className="lg:block hidden place-self-end">
				<img src={close} alt="Fechar modal"/>
			</button>

			<h3 className="text-custom-black text-2xl font-semibold border-b-2 pb-[14px] mb-[34px]">Amigos</h3>
			<span className="lg:hidden absolute w-[72.5px] h-[2px] bg-custom-red top-[141px] left-[45px] transform translate-y-[calc(100%-2px)]"></span>
			{selectedFriends?.map((f) => (
				<div key={f.userId} className="flex items-center justify-between lg:my-[22px] my-[10px]">
					<div className='flex gap-4'>
						<img 
							className="rounded-full lg:max-h-14 lg:max-w-14 max-w-10 max-h-10" 
							src={f.profileLink} 
							alt={`Foto de ${f.name}`} 
						/>
						<div>
							<p className="text-custom-black font-semibold lg:text-xl text-base">{f.username}</p>
							<span className="text-custom-gray font-semibold lg:text-base text-xs">{f.name}</span>
						</div>
					</div>
					<Link
						onClick={onClose} 
						to={`/perfil/${f.userId}`} 
						className="justify-self-center bg-custom-red text-xs text-white rounded-lg px-2 py-1 shadow"
					>Ver Perfil</Link>
				</div>
			))}
			<Pagination 
                length={friends ? friends.length : 0} 
				defaultSize={itemsPerPage}
                currentPage={currentPage} 
                onPageChange={handlePageChange} 
            />
		</div>
	);
}