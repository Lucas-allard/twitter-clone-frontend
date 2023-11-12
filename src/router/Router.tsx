import {createBrowserRouter, RouteObject} from "react-router-dom";
import PrivateRoute from "./PrivateRoute.tsx";
import AuthService from "../services/AuthService.ts";
import PublicRoute from "./PublicRoute.tsx";

export const router = createBrowserRouter([
    AuthService.isAuthenticated()? PrivateRoute() : {},
    ...PublicRoute(),
] as RouteObject[]);
