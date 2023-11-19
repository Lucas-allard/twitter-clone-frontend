import {User} from "../../types";
import {FC, ReactElement} from "react";
import UserProfileHeader from "./UserProfileHeader.tsx";
import UserProfileDetails from "./UserProfileDetails.tsx";
import {ModalProvider} from "../../context/ModalContex.tsx";

interface UserProfileProps {
    user: User;
}

const UserProfile: FC<UserProfileProps> = ({user}: UserProfileProps): ReactElement => {

    return (
        <>
            <ModalProvider>
                <UserProfileHeader user={user}/>
            </ModalProvider>
            <UserProfileDetails user={user}/>
        </>
    );
}

export default UserProfile;