import { LoginForm } from "../components/forms/LoginForm";
import logo from "/assets/logo.svg"
import welcome from "/assets/welcome.png"

export function Login(){
	
    return(
        <section className="flex w-full">
            <div 
                className="lg:w-1/2 w-full items-center flex flex-col 
                    lg:gap-y-[120px] lg:px-[185px] lg:pt-[100px]
                    gap-y-12 py-[56px]"
            >
                <img src={logo} alt="Teachgram" className="h-[50px]"/>
                <LoginForm />
            </div>
            <img className="lg:w-1/2 hidden lg:block lg:h-screen object-cover"
                src={welcome} 
                alt="Duas moças tirando uma selfie" 
            />
        </section>
    );
}