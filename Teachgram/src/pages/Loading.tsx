import LoadingLogo from "/assets/loading_logo.svg";

export function Loading(){
    return(
        <main className="flex flex-col items-center justify-center bg-custom-red h-screen w-full lg:gap-y-6 gap-y-5">
            <img src={LoadingLogo} alt="Logo Teachgram" className="lg:w-[218px] lg:h-[218px] w-[96px] h-[96px]"/>
            <p className="font-bold text-white text-2xl">Carregando...</p>
        </main>
    );
}