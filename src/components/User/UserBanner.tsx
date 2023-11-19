import {FC, ReactElement} from "react";
import Wrapper from "../Wrapper/Wrapper.tsx";

interface UserBannerProps {
    userBanner: string;
}
const UserBanner: FC<UserBannerProps> = ({userBanner}: UserBannerProps) : ReactElement => {
    return (
        <Wrapper className="w-full flex flex-row justify-center items-center">
            {userBanner && (
                <img src={userBanner} alt="banner" className="w-full h-60"/>
            )}
            {!userBanner && (
                <Wrapper className="w-full h-72 bg-zinc-800"/>
            )}
        </Wrapper>
    )
}

export default UserBanner;