import { RegisterForm } from "../components/forms/RegisterForm";
import logo from "/assets/logo.svg"
import welcome from "/assets/welcome.png"

export function Register(){
    return(
        <section className="flex w-full">
            <div 
                className="lg:w-1/2 w-full items-center flex flex-col 
                    lg:gap-y-[120px] lg:px-[185px] lg:pt-[100px]
                    gap-y-12 py-[56px]"
            >
                <img src={logo} alt="Teachgram" className="h-[50px]"/>
                <RegisterForm />
            </div>
            <img
                className="lg:w-1/2 hidden lg:block"
                src={welcome} 
                alt="Duas moças tirando uma selfie"  
            />
        </section>
    );
}
