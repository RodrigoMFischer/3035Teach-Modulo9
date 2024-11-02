import { Navigate, Outlet } from "react-router-dom"
import { getUser } from "../../utils/functions"

export function PublicRoute() {
  const user = getUser()

  return user ? <Navigate to="/feed"/> : <Outlet/>
}