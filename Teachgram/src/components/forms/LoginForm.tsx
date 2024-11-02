import { Button } from "./utils/Button";
import { ForwardedInput } from "./utils/Input";
import { Label } from "./utils/Label";
import { RememberPass } from "./utils/RememberPass";
import { ButtonSecondary } from "./utils/ButtonSecondary";
import GoogleIcon from "/assets/google.png";
import AppleIcon from "/assets/apple.png";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "../../hooks/LoginHook";
import { save } from "../../utils/functions";
import { useEffect } from "react";

interface FormInputs{
    email: string;
    senha: string;
}

export function LoginForm(){
	const { data, error, fecthLogin } = useLogin();
    const { register, handleSubmit, formState: { errors }} = useForm<FormInputs>();
	const navigate = useNavigate();

    const onSubmit: SubmitHandler<FormInputs> = async (formData) => {
		try {
            await fecthLogin({ email: formData.email, password: formData.senha });
        } catch (e) {
            console.error("Erro ao realizar login", e);
        };
	}

	useEffect(() => {
		if (data){
			save(data);
			navigate("/feed");
		}
	}, [data, navigate]);

    return(
        <div className="lg:pl-[45px]">
            <h1 className="font-semibold text-xl mb-[30px]">Faça seu Login</h1>
            <form className="flex flex-col gap-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-y-1.5">
                    <Label 
                        htmlFor="email"
                        title="E-mail"
                    />
                    <ForwardedInput
                        {...register("email", {required: "E-mail é obrigatório"})}
                        id="email"
                        placeholder="Digite seu E-mail"
                        type="text"
                    />
                    {errors.email && 
                        <p className="text-custom-red text-base text-end font-semibold mt-1">
                            <span className="inline-block h-2 w-2 mr-2 bg-custom-red rounded-full"></span>
                                {errors.email.message}
                        </p>
                    }
                </div>
                <div className="flex flex-col gap-y-1.5">
                    <Label 
                        htmlFor="senha"
                        title="Senha"
                    />
                    <ForwardedInput
                        {...register("senha", {required: "Senha é obrigatório"})}
                        id="senha"
                        placeholder="Digite sua Senha"
                        type="password"
                    />
                    <div className="flex items-center justify-between">
                        <RememberPass />
                        <a href="/" className="text-custom-gray underline text-xs">Esqueci minha senha</a>
                    </div>
                    {errors.senha && 
                        <p className="text-custom-red text-base text-end font-semibold mt-1">
                            <span className="inline-block h-2 w-2 mr-2 bg-custom-red rounded-full"></span>
                                {errors.senha.message}
                        </p>
                    }
					{error && 
                        <p className="text-custom-red text-base text-end font-semibold mt-1">
                            <span className="inline-block h-2 w-2 mr-2 bg-custom-red rounded-full"></span>
                                {error}
                        </p>
                    }
                </div>
				<Button 
					type="submit" 
					title="Entrar"
				/>
                <span className="text-base text-custom-black self-center">Não possui conta? 
                    <Link to="/cadastro" className="ml-1 font-semibold text-custom-red underline">
                        Cadastre-se
                    </Link>
                </span>
                <div className="flex items-center justify-between gap-x-8">
                    <div className="flex-1 bg-custom-border-input h-0.5"></div>
                    <span className="font-xs text-custom-border-input">Entrar com</span>
                    <div className="flex-1 bg-custom-border-input h-0.5"></div>
                </div>

                <ButtonSecondary
                    type="button"
                    title="Entrar com Google"
                    icon={GoogleIcon}
                    alt="Ícone do google"
                />
                <ButtonSecondary
                    type="button"
                    title="Entrar com Apple"
                    icon={AppleIcon}
                    alt="Ícone da apple"
                />
            </form>
        </div>
    );
}