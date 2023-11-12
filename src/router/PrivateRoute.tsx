import HomePage from "../views/HomePage.tsx";
import {Navigate} from "react-router-dom";
import Layout from "../views/Layout.tsx";

const PrivateRoute= () => {
    return {
        element: <Layout />,
        children: [
            { path: "/", element: <HomePage /> },
            { path: "*", element: <Navigate to="/" replace /> },
        ],
    }
}

export default PrivateRoute;