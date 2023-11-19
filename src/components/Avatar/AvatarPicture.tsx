import Wrapper from "../Wrapper/Wrapper.tsx";
import {FC, ReactElement} from "react";

interface AvatarPictureProps {
    profilePicture: string;
    username: string;
    className?: string | undefined;
    profilePictureSize?: string | undefined
}

const AvatarPicture: FC<AvatarPictureProps> = (
    {
        profilePicture,
        username,
        className,
        profilePictureSize
    }
): ReactElement =>
    (
        <Wrapper className={`flex flex-row cursor-pointer ${className ?? ""}`}>
            <img
                src={profilePicture ?? 'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png'}
                alt={`Avatar de ${username}`}
                className={`rounded-full ${profilePictureSize ?? "w-8 h-8"}`}
            />
        </Wrapper>
    );

export default AvatarPicture;