import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "./utils/Button";
import { ForwardedInput } from "./utils/Input";
import { Label } from "./utils/Label";
import { Link } from "react-router-dom";
import { useState } from "react";
import useRegister from "../../hooks/RegisterHook";
import { Loading } from "../../pages/Loading";


interface FormInputs{
    nome: string;
    email: string;
    username: string ;
    descricao: string;
    celular: string;
    senha: string;
    link: string;
}

export function RegisterForm(){
    const { register, handleSubmit, formState: { errors }} = useForm<FormInputs>();
    const [send, setSend] = useState(false);
    const [buttonText, setButtonText] = useState("Próximo");
    const [title, setTitle] = useState("Crie sua conta");

	const { fetchRegister, loading } = useRegister();

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        if (!send) {
            setSend(true);
            setTitle("Insira o link da sua foto de perfil");
            setButtonText("Salvar");
        } else {
            await fetchRegister({
                name: data.nome,
                username: data.username,
                email: data.email,
                password: data.senha,
                phone: data.celular,
                description: data.descricao,
                profileLink: data.link,
                deleted: false,
            });
        };
    }

    return(
        <div className="lg:pl-[45px] flex flex-col items-start">
            <h1 className="font-semibold text-xl mb-[30px]">{title}</h1>
            <form className="flex flex-col gap-y-6" onSubmit={handleSubmit(onSubmit)}>
                {!send && (
                <>
                    <div className="flex flex-col gap-y-1.5">
                        <Label 
                            htmlFor="nome"
                            title="Nome"
                        />
                        <ForwardedInput
                            {...register("nome", {required: "Campo não preenchido"})}
                            id="nome"
                            placeholder="Digite seu nome"
                            type="text"
                        />
                        {errors.nome && 
                            <p className="text-custom-red text-base text-end font-semibold mt-1">
                                <span className="inline-block h-2 w-2 mr-2 bg-custom-red rounded-full"></span>
                                    {errors.nome.message}
                            </p>
                        }
                    </div>
                    <div className="flex flex-col gap-y-1.5">
                        <Label 
                            htmlFor="email"
                            title="E-mail"
                        />
                        <ForwardedInput
                            {...register("email", {required: "Campo não preenchido"})}
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
                            htmlFor="username"
                            title="Username"
                        />
                        <ForwardedInput
                            {...register("username", {required: "Campo não preenchido"})}
                            id="username"
                            placeholder="Digite seu username"
                            type="text"
                            initialValue="@"
                        />
                        {errors.username && 
                            <p className="text-custom-red text-base text-end font-semibold mt-1">
                                <span className="inline-block h-2 w-2 mr-2 bg-custom-red rounded-full"></span>
                                    {errors.username.message}
                            </p>
                        }
                    </div>
                    <div className="flex flex-col gap-y-1.5">
                        <Label 
                            htmlFor="descricao"
                            title="Descrição"
                        />
                        <ForwardedInput
                            {...register("descricao", {required: "Campo não preenchido"})}
                            id="descricao"
                            placeholder="Faça uma descrição"
                            type="text"
                        />
                        {errors.descricao && 
                            <p className="text-custom-red text-base text-end font-semibold mt-1">
                                <span className="inline-block h-2 w-2 mr-2 bg-custom-red rounded-full"></span>
                                    {errors.descricao.message}
                            </p>
                        }
                    </div>
                    <div className="flex flex-col gap-y-1.5">
                        <Label 
                            htmlFor="celular"
                            title="Celular"
                        />
                        <ForwardedInput
							{...register("celular", {
								required: "Campo não preenchido",
								pattern: {
								value: /^[0-9]*$/,
								message: "Digite apenas números",
								},
							})}
							id="celular"
							placeholder="51999999999"
							type="text"
						/>
                        {errors.celular && 
                            <p className="text-custom-red text-base text-end font-semibold mt-1">
                                <span className="inline-block h-2 w-2 mr-2 bg-custom-red rounded-full"></span>
                                    {errors.celular.message}
                            </p>
                        }
                    </div>
                    <div className="flex flex-col gap-y-1.5 mb-3">
                        <Label 
                            htmlFor="senha"
                            title="Senha"
                        />
                        <ForwardedInput
                            {...register("senha", {required: "Campo não preenchido"})}
                            id="senha"
                            placeholder="Digite sua Senha"
                            type="password"
                        />
                        {errors.senha && 
                            <p className="text-custom-red text-base text-end font-semibold mt-1">
                                <span className="inline-block h-2 w-2 mr-2 bg-custom-red rounded-full"></span>
                                    {errors.senha.message}
                            </p>
                        }
                    </div>
                </>
                )}


                {send && (
                    <div className="flex flex-col gap-y-1.5">
                        <Label htmlFor="link" title="Link" />
                        <ForwardedInput
                            {...register("link", { required: "Campo não preenchido" })}
                            id="link"
                            placeholder="Insira seu link"
                            type="text"
                        />
                        {errors.link && (
                            <p className="text-custom-red text-base text-end font-semibold mt-1">
                                <span className="inline-block h-2 w-2 mr-2 bg-custom-red rounded-full"></span>
                                {errors.link.message}
                            </p>
                        )}
                    </div>
                )}

				<Button type="submit" title={loading ? "Enviando..." : buttonText} disabled={loading}/>
            </form>

            <span className="text-base text-custom-black self-center mt-[20px]">Já possui conta? 
                    <Link to="/" className="ml-1 font-semibold text-custom-red underline">
                        Entrar
                    </Link>
            </span>
        </div>
    );
}