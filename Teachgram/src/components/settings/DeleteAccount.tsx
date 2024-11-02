import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";

interface DeleteAccountProps {
	onClose: () => void;
}

export function DeleteAccount({ onClose }: DeleteAccountProps){
	const { deleteUserAccount } = useUserContext();
	const navigate = useNavigate();

	const handleDeleteAccount = async () => {
		await deleteUserAccount(navigate);
	};

	return(
		<div className="
			relative flex flex-col bg-white space-y-[37px]  lg:py-[44px] py-[34px] lg:px-[54px] px-12 
			rounded-[34px] lg:min-w-[528px] shadow-lg">
			<h3 className="font-semibold text-xl lg:text-start text-center">Excluir conta</h3>
			<hr className="absolute w-full left-0 lg:top-[50px] top-[40px]"/>
			<p className="text-custom-black text-base lg:text-start text-center">Todos os seus dados serão excluídos.</p>

			<div className="flex flex-1 items-center justify-center lg:gap-[47px] gap-[20px] lg:mt-4 mt-1">
				<button 
					type="button" 
					className="lg:px-3 px-2 py-1 bg-transparent border border-custom-red shadow rounded-lg text-custom-red text-base lg:min-w-[147px]"
					onClick={onClose}
				>
					Cancelar
				</button>

				<button 
					onClick={handleDeleteAccount}
					type="button" 
					className="self-start lg:px-3 px-2 py-1 bg-custom-red shadow rounded-lg text-white text-base lg:min-w-[147px]"
				>
					Confirmar
				</button>
			</div>
		</div>
	);
}
