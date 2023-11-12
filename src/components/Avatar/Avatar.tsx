import {IconDots} from "@tabler/icons-react";
import Wrapper from "../Wrapper/Wrapper.tsx";
import AvatarPicture from "./AvatarPicture.tsx";
import {FC, ReactElement} from "react";

interface AvatarProps {
    profilePicture: string;
    name: string;
    username: string;
}

const Avatar: FC<AvatarProps> = (
    {
        profilePicture,
        name,
        username
    }
): ReactElement => (
    <Wrapper className="flex flex-row justify-between items-center">
        <AvatarPicture
            profilePicture={profilePicture}
            username={username}
            className="w-full 2xl:w-auto hover:bg-white/10 rounded-full p-2"
        />
        <Wrapper className="hidden flex-1 pl-4 2xl:flex flex-col text-gray-400">
            <span className="font-bold">@{username}</span>
            <span className="italic">{name}</span>
        </Wrapper>
        <Wrapper className="hidden 2xl:flex flex-col p-2 text-gray-400 cursor-pointer">
            <IconDots size={24}/>
        </Wrapper>
    </Wrapper>
);

export default Avatar;