import {ReactElement} from "react";
import Layout from "../views/Layout.tsx";
import {Navigate} from "react-router-dom";
import AuthService from "../services/AuthService.ts";


const PrivateRoute = (): ReactElement => {
    return AuthService.isAuthenticated() ? <Layout/> : <Navigate to="/login" replace/>;
};

export default PrivateRoute;