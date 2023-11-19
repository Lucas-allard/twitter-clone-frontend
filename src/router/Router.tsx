import {createBrowserRouter, Navigate, RouteObject} from "react-router-dom";
import PrivateRoute from "./PrivateRoute.tsx";
import HomePage from "../views/HomePage.tsx";
import PublicRoutes from "./PublicRoutes.tsx";
import TweetPage from "../views/TweetPage.tsx";

export const router = createBrowserRouter([
    {
        element: <PrivateRoute/>,
        children: [
            {
                path: "/home",
                element: <HomePage/>,
            },
            {
                path: "/:username/status/:id",
                element: <TweetPage/>,
            },
            {
                path: "*",
                element: <Navigate to="/home" replace/>,
            },
        ],
    },
    ...PublicRoutes(),
] as RouteObject[]);
