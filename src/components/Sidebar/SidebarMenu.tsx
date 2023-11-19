import {
    IconHome,
    IconSearch,
    IconBell,
    IconMail,
    IconUser, IconFeather, IconLogout,
} from "@tabler/icons-react";
import {ReactElement} from "react";
import {Link} from "react-router-dom";
import Wrapper from "../Wrapper/Wrapper.tsx";
import Button from "../Commons/Button.tsx";
import Avatar from "../Avatar/Avatar.tsx";
import {useModal} from "../../context/ModalContex.tsx";
import {ModalContextProps} from "../../types";
import {useAppDispatch, useAppSelector} from "../../hooks.ts";
import {logout, selectUser} from "../../features/user/userSlice.ts";

const SidebarMenu = ({}) => {
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    const {openModal}: ModalContextProps = useModal();
    const ACTIVE_ICON_COLOR: string = "#FFFFFF";
    const INACTIVE_ICON_COLOR: string = "#E5E7EB";
    const ICON_SIZE: number = 20;
    const ACTIVE_LINK: string = "active-link";
    const INACTIVE_LINK: string = "not-active-link";
    const pathName: string = location.pathname;
    const routes: string[] = [
        "/home",
        "/explorer",
        "/notifications",
        "/messages",
        "/profile",
    ];

    const getActiveColor = (route: string, currentPath: string): string => {
        return route === currentPath ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR;
    }
    const getIconForRoute = (route: string, currentPath: string): ReactElement | null => {
        switch (route) {
            case "/home":
                return <IconHome
                    size={ICON_SIZE}
                    color={getActiveColor(route, currentPath)}
                />;
            case "/explorer":
                return <IconSearch
                    size={ICON_SIZE}
                    color={getActiveColor(route, currentPath)}
                />;
            case "/notifications":
                return <IconBell
                    size={ICON_SIZE}
                    color={getActiveColor(route, currentPath)}
                />;
            case "/messages":
                return <IconMail
                    size={ICON_SIZE}
                    color={getActiveColor(route, currentPath)}
                />;
            case "/profile":
                return <IconUser
                    size={ICON_SIZE}
                    color={getActiveColor(route, currentPath)}
                />;
            default:
                return null;
        }
    }
    const getTextForRoute = (route: string) => {
        switch (route) {
            case "/home":
                return "Accueil";
            case "/explorer":
                return "Explorer";
            case "/notifications":
                return "Notifications";
            case "/messages":
                return "Messages";
            case "/profile":
                return "Profil";
            default:
                return null;
        }
    }

    const links = routes.map((route: string) => ({
            icon: getIconForRoute(route, pathName),
            text: getTextForRoute(route),
            href: route,
            className: pathName === route ? ACTIVE_LINK : INACTIVE_LINK
        }));

    return (
        <aside
            className="sticky top-0 py-4 pr-4 pl-8 w-min min-h-screen max-h-screen 2xl:w-[300px] flex flex-col justify-between border-r border-gray-600">
            <nav>
                <ul className="flex flex-col">
                    <li className="sidebar-item w-fit 2xl:px-6 font-black-ops-one font-thin text-xl">
                        <Link to="/home" className="flex items-center">X</Link>
                    </li>
                    {links.map((link, index) => (
                            <li
                                className={`sidebar-item ${pathName === link.href ? 'active' : ''}`}
                                key={index}
                            >
                                <Link
                                    to={link.href}
                                    className="flex flex-row items-center"
                                >
                                    {link.icon}
                                    <span className={link.className}>
                                        {link.text}
                                    </span>
                                </Link>
                            </li>
                        )
                    )}
                    <li
                        className="sidebar-item flex flex-row items-center gap-0"
                        onClick={() => dispatch(logout())}
                    >
                        <IconLogout
                            size={ICON_SIZE}
                            color={INACTIVE_ICON_COLOR}
                        />
                        <span className={INACTIVE_LINK}>
                                Déconnexion
                            </span>
                    </li>
                </ul>
                <Wrapper className="pt-2 flex flex-col items-center">
                    <Button
                        className="button-primary p-2 2xl:py-2 2xl:px-6 2xl:w-[80%] flex flex-row items-center"
                        onClick={() => openModal('tweet')}
                    >
                        <IconFeather
                            size={ICON_SIZE}
                            color="white"
                            className="2xl:hidden"
                        />
                        <span className="hidden 2xl:inline-block w-full text-center">
                            Poster
                        </span>
                    </Button>
                </Wrapper>
            </nav>
            {user &&
                <Avatar
                    username={user.username}
                    name={user.name}
                    profilePicture={user.image}
                />
            }
        </aside>
    )
};

export default SidebarMenu;