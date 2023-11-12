import { Outlet } from "react-router-dom";
import {FC, ReactElement, Suspense} from "react";

const Layout: FC = (): ReactElement => {
    return (
        <>
            <Suspense>
                <Outlet />
            </Suspense>
        </>
    );
}

export default Layout;