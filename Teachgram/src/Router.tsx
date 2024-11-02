import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Feed } from "./pages/Feed";
import { TokenVerify } from "./pages/layouts/TokenVerify";
import { PublicRoute } from "./pages/layouts/PublicRouter";
import { PrivateRoute } from "./pages/layouts/PrivateRouter";
import { UserProvider } from "./context/UserContext";
import { Profile } from "./pages/Profile";
import { PostProvider } from "./context/PostsContext";
import { Settings } from "./pages/Settings";
import { ProfileSettings } from "./components/settings/ProfileSettings";
import { AccountSettings } from "./components/settings/AccountSettings";
import { SettingProvider } from "./context/SettingContext";

export function Router(){
    return(
        <BrowserRouter>
			<UserProvider>
				<PostProvider >
					<SettingProvider>
						<Routes>
							<Route path="/" element={<TokenVerify />} />

							<Route element={<PublicRoute />}>
								<Route path="/login" element={<Login />} />
								<Route path="/cadastro" element={<Register />} />
							</Route>
						
						
							<Route element={<PrivateRoute />}>
								<Route path="/feed" element={<Feed />} />
								<Route path="/perfil" element={<Profile />} />
								<Route path="/perfil/:id" element={<Profile />} />
								<Route path="/configuracoes" element={<Settings />} >
									<Route path="perfil" element={<ProfileSettings />} />
									<Route path="conta" element={<AccountSettings />} />
								</Route>
							</Route>
						</Routes>
					</SettingProvider>
				</PostProvider>
			</UserProvider>
        </BrowserRouter>
    );
}