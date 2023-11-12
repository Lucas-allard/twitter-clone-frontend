import Wrapper from "../Wrapper/Wrapper.tsx";
import {FC, ReactElement} from "react";

interface AvatarPictureProps {
    profilePicture: string;
    username: string;
    className?: string | undefined;
}

const AvatarPicture: FC<AvatarPictureProps> = (
    {
        profilePicture,
        username,
        className
    }
): ReactElement =>
    (

        <Wrapper className={`flex flex-row cursor-pointer ${className}`}>
            <img src={profilePicture ?? 'https://via.placeholder.com/150'}
                 alt={`Avatar de ${username}`}
                 className="mx-auto rounded-full w-8 h-8"
            />
        </Wrapper>
    );

export default AvatarPicture;