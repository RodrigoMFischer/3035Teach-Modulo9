import { Navigate, Outlet } from "react-router-dom";
import { getUser } from "../../utils/functions";

export function PrivateRoute() {
	const user = getUser();

	return user ? <Outlet /> : <Navigate to="/login" />
}