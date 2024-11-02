import Logout from "./Logout";
import logo from "/assets/logo.svg";

interface LogoutContainerProps {
	className?: string;
}

export function LogoutContainer({ className }: LogoutContainerProps) {
	return (
		<div className={`flex justify-start lg:space-x-6 pl-[45px] lg:pl-0
			fixed lg:relative lg:py-0 py-6 w-full top-0 bg-white shadow-bottom lg:shadow-none lg:bg-transparent
			${className}
			`}>
			<Logout />
			<img src={logo} alt="Teachgram" className="h-9" />
		</div>
	);
}
