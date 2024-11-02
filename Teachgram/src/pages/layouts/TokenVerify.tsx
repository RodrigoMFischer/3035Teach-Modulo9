import { Navigate } from "react-router-dom";
import { getUser } from "../../utils/functions";

export function TokenVerify(){
	const user = getUser();
	return user ? <Navigate to={"/feed"}/> : <Navigate to={"/login"}/>
}

