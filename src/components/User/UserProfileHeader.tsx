import Wrapper from "../Wrapper/Wrapper.tsx";
import {Link} from "react-router-dom";
import {IconArrowLeft} from "@tabler/icons-react";
import Button from "../Commons/Button.tsx";
import {User} from "../../types";
import {FC, ReactElement} from "react";
import {useModal} from "../../context/ModalContex.tsx";
import Modal from "../Modal/Modal.tsx";
import UserBanner from "./UserBanner.tsx";
import AvatarPicture from "../Avatar/AvatarPicture.tsx";
import UserForm from "../Form/UserForm.tsx";

interface UserProfileHeaderProps {
    user: User;
}

const UserProfileHeader: FC<UserProfileHeaderProps> = ({user}: UserProfileHeaderProps): ReactElement => {
    const {openModal} = useModal();
    return (
        <>
            <Wrapper
                className="w-full flex flex-row justify-start items-center fixed bg-black/90 z-10">
                <Link to={"/home"} className="p-2 mx-2 rounded-full hover:bg-white/10" replace>
                    <IconArrowLeft color="white" size={24} className="cursor-pointer"/>
                </Link>
                <Wrapper className="p-2 mx-2 flex flex-col">
                    <span className="text-white text-xl font-bold">{user.name}</span>
                    <span className="text-gray-500 text-sm">{user.tweets?.length ?? 0} posts</span>
                </Wrapper>
            </Wrapper>
            <Wrapper className="w-full flex flex-col justify-center items-center relative mb-14">
                <UserBanner userBanner={user.banner}/>
                <AvatarPicture
                    profilePicture={user.image}
                    username={user.username}
                    className="absolute left-8 top-56 w-32 h-32 rounded-full"
                    profilePictureSize="w-36"
                />
                <Wrapper className="w-full flex flex-row justify-end items-center mr-8 mt-4">
                    <Button
                        className="button-primary p-2 2xl:py-2 2xl:px-6 2xl:w-[80%] flex flex-row items-center"
                        onClick={() => openModal('user')}
                    >
                        Editer le profil
                    </Button>
                </Wrapper>
            </Wrapper>
            <Modal modalType="user">
                <UserForm user={user}/>
            </Modal>
        </>
    )
}

export default UserProfileHeader;