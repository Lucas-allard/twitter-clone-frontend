import { Navigate } from "react-router-dom";
import LoginPage from "../views/LoginPage.tsx";
import {ReactElement} from "react";
import SignupPage from "../views/SignupPage.tsx";

interface Route {
    path: string;
    element: ReactElement

}

const PublicRoute = (): Route[] => {
    return [
        { path: "/login", element: <LoginPage /> },
        { path: "/signup", element: <SignupPage />},
        { path: "*", element: <Navigate to="/login" replace /> },
    ];
}

export default PublicRoute;