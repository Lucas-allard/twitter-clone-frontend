import {FC, ReactElement} from "react";
import {User} from "../../types";
import Wrapper from "../Wrapper/Wrapper.tsx";
import {IconCalendar} from "@tabler/icons-react";

interface UserProfileDetailsProps {
    user: User;
}
const UserProfileDetails: FC<UserProfileDetailsProps> = ({user}: UserProfileDetailsProps): ReactElement => {
    return (
        <Wrapper className="w-full flex flex-col pl-8">
            <span className="text-white text-xl font-bold">{user.name}</span>
            <span className="text-gray-500 text-sm mt-2">@{user.username}</span>
            <span className="text-gray-500 text-xl flex flex-row justify-start items-center mt-2">
                <IconCalendar size={24} color="rgb(107 114 128)"/>
                <span className="ml-2">Créé en {user.createdAt}</span>
            </span>
            <span className="text-gray-500 text-sm flex flex-row justify-start items-center mt-2">
                <span>{user.following?.length ?? 0} following</span>
                <span className="ml-2">{user.followers?.length ?? 0} followers</span>
            </span>
        </Wrapper>
    )
}

export default UserProfileDetails;