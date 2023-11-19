import {useParams} from "react-router-dom";
import {getUser, selectUser, selectUserLoading} from "../features/user/userSlice.ts";
import {useAppDispatch, useAppSelector} from "../hooks.ts";
import {AppDispatch} from "../store.ts";
import {useEffect} from "react";
import {User} from "../types";
import AppContainer from "../components/Commons/AppContainer.tsx";
import {ModalProvider} from "../context/ModalContex.tsx";
import SidebarMenu from "../components/Sidebar/SidebarMenu.tsx";
import Modal from "../components/Modal/Modal.tsx";
import TweetForm from "../components/Form/TweetForm.tsx";
import Loading from "../components/Commons/Loading.tsx";
import SearchPanel from "../components/Sidebar/SearchPanel.tsx";
import UserProfile from "../components/User/UserProfile.tsx";

const ProfilePage = () => {
    const {id} = useParams();
    const user: User | null = useAppSelector(selectUser);
    const dispatch: AppDispatch = useAppDispatch();
    const loading: boolean = useAppSelector(selectUserLoading);

    useEffect(() => {
        if (user?.id === id) {
            dispatch(getUser());
        } else {
            dispatch(getUser(id));
        }
    }, []);

    return (
        <AppContainer>
            <ModalProvider>
                <SidebarMenu/>
                <Modal modalType="tweet">
                    <TweetForm/>
                </Modal>
            </ModalProvider>
            <main>
                {loading && <Loading/>}
                {!loading && user && (
                    <UserProfile user={user}/>
                )}
            </main>
            <SearchPanel/>
        </AppContainer>
    );
}
export default ProfilePage;