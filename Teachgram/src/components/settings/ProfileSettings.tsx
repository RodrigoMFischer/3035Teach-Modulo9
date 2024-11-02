import { useForm } from "react-hook-form";
import { useUserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useSettingContext } from "../../context/SettingContext";

interface FormInputs {
  fotoPerfil: string;
  nome: string;
  username: string;
  bio: string;
}

export function ProfileSettings() {
  const { register, handleSubmit, formState: { errors }} = useForm<FormInputs>();
  const { user, updateUserInfo } = useUserContext();
  const navigate = useNavigate();
  const { setInitialMenuOpen } = useSettingContext();
  
  if (!user) return null;

  const onSubmit = async (data: FormInputs) => {
    const updatedData = {
		fotoPerfil: data.fotoPerfil,
		nome: data.nome,
		username: data.username,
		bio: data.bio,
	};
	
	await updateUserInfo(updatedData);
	setInitialMenuOpen(true);
  };

  return (
	<>
		<h3 className="text-2xl font-semibold text-custom-black mb-[51px]">Editar perfil</h3>
		<img 
			src={user.profileLink} alt={`Foto de ${user.name}`} 
			className="max-h-[176px] max-w-[176px] rounded-full mb-[46px] self-center lg:self-start"
		/>
		<form className="flex flex-col lg:w-1/2 w-full gap-[18px] mb-3" onSubmit={handleSubmit(onSubmit)}>
			<div className="flex flex-col space-y-2">
				<label htmlFor="fotoPerfil" className="text-xl text-custom-black">Foto de perfil</label>
				<input 
				id="fotoPerfil" 
				type="text" 
				defaultValue={user.profileLink} 
				{...register("fotoPerfil", { required: "Foto de perfil é obrigatório" })} 
				className="text-xl text-custom-gray focus:outline-none text-custom-red truncate"
				/>
				<hr />
				{errors.fotoPerfil && 
				<p className="text-custom-red text-base text-end font-semibold mt-1">
					<span className="inline-block h-2 w-2 mr-2 bg-custom-red rounded-full"></span>
					{errors.fotoPerfil.message}
				</p>
				}
			</div>

			<div className="flex flex-col space-y-2">
				<label htmlFor="nome" className="text-xl text-custom-black">Nome</label>
				<input 
				id="nome" 
				type="text" 
				defaultValue={user.name} 
				{...register("nome", { required: "O nome é obrigatório" })} 
				className="text-xl text-custom-gray focus:outline-none"
				/>
				<hr />
				{errors.nome && 
				<p className="text-custom-red text-base text-end font-semibold mt-1">
					<span className="inline-block h-2 w-2 mr-2 bg-custom-red rounded-full"></span>
					{errors.nome.message}
				</p>
				}
			</div>

			<div className="flex flex-col space-y-2">
				<label htmlFor="username" className="text-xl text-custom-black">Nome do usuário</label>
				<input 
				id="username" 
				type="text" 
				defaultValue={user.username} 
				{...register("username", { required: "O username é obrigatório" })} 
				className="text-xl text-custom-gray focus:outline-none"
				/>
				<hr />
				{errors.username && 
				<p className="text-custom-red text-base text-end font-semibold mt-1">
					<span className="inline-block h-2 w-2 mr-2 bg-custom-red rounded-full"></span>
					{errors.username.message}
				</p>
				}
			</div>

			<div className="flex flex-col space-y-2">
				<label htmlFor="bio" className="text-xl text-custom-black">Bio</label>
				<input 
				id="bio" 
				type="text" 
				defaultValue={user.description}
				{...register("bio", { required: "A bio é obrigatória" })} 
				className="truncate text-xl text-custom-gray focus:outline-none"
				/>
				<hr />
				{errors.bio && 
				<p className="text-custom-red text-base text-end font-semibold mt-1">
					<span className="inline-block h-2 w-2 mr-2 bg-custom-red rounded-full"></span>
					{errors.bio.message}
				</p>
				}
			</div>

			<div className="flex flex-1 items-center justify-start gap-[20px] mt-4">
				<button 
					type="button" 
					className="px-3 py-1 bg-transparent border border-custom-red shadow rounded-lg text-custom-red text-base"
					onClick={() => { setInitialMenuOpen(true); navigate(-1) }}
				>
					Cancelar
				</button>

				<button 
					type="submit" 
					className="self-start px-3 py-1 bg-custom-red shadow rounded-lg text-white text-base"
				>
					Salvar
				</button>
			</div>
		</form>
	</>
  );
}
