import LoginPage from "../views/LoginPage.tsx";
import SignupPage from "../views/SignupPage.tsx";
import {RouteObject, Navigate} from "react-router-dom";
import AuthService from "../services/AuthService.ts";

const PublicRoutes = (): RouteObject[] => {
    return AuthService.isAuthenticated() ?
        [
            {
                path: "*",
                element: <Navigate to="/home" replace/>
            }
        ] :
        [
            {
                path: "/login",
                element: <LoginPage/>
            },
            {
                path: "/signup",
                element: <SignupPage/>
            },
        ];
};

export default PublicRoutes;
