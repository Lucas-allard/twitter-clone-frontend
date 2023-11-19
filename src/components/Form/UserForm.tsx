import {ChangeEvent, FC, ReactElement, useState} from "react";
import Form from "./Form.tsx";
import Wrapper from "../Wrapper/Wrapper.tsx";
import Button from "../Commons/Button.tsx";
import AvatarPicture from "../Avatar/AvatarPicture.tsx";
import {User, UserDto} from "../../types";
import UserBanner from "../User/UserBanner.tsx";
import {IconCamera} from "@tabler/icons-react";
import Label from "./Label.tsx";
import Input from "./Input.tsx";
import {getTextForFields, getTypeForFields} from "../../utils/fieldsHelper.ts";

interface UserFormProps {
    user: User;
}

const UserForm: FC<UserFormProps> = ({user}: UserFormProps): ReactElement => {
    const [userDetails, setUserDetails] = useState<UserDto>({
        name: user.name,
        bio: user.bio,
        image: user.image,
        banner: user.banner,
    });

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserDetails({
            ...userDetails,
            [e.target.name]: e.target.value
        })
    }
    const onSubmit = () => {

    }

    const fields: Array<{
        name: string;
        value: string;
        text: string;
        type: string;
        onChange: (event: ChangeEvent<HTMLInputElement>) => void;
        index: number;
    }> = Object.entries(userDetails)
        .filter(([key]) => key !== "image" && key !== "banner")
        .map(([userDetail, value], index) => ({
            name: userDetail,
            value: value,
            text: getTextForFields(userDetail),
            type: getTypeForFields(userDetail),
            onChange,
            index,
        }));

    return (
        <Form onSubmit={onSubmit} className="relative text-white w-full h-[80vh]">
            <Wrapper className="absolute -top-10 left-12 w-5/6 font-bold flex flex-row justify-between bg-black z-50">
                <h1 className="text-xl">Editer le profil</h1>
                <Button className="button-primary px-4 py-2 absolute -top-2 -right-2" type="submit">
                    Enregistrer
                </Button>
            </Wrapper>
            <Wrapper className="overflow-x-hidden overflow-y-auto h-full w-full bg-black">
                <Wrapper className="w-full flex flex-col justify-center items-center relative mb-14 mt-4 bg-black">
                    <Wrapper className="relative h-full w-full">
                        <UserBanner
                            userBanner={user.banner}
                        />
                        <Wrapper
                            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-10 w-10 bg-black/20 hover:bg-black/50 rounded-full ">
                            <Label htmlFor="banner"
                                   className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
                                <IconCamera
                                    className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                                    size={24}/>
                            </Label>
                            <Input
                                type="file"
                                id="banner"
                                name="banner"
                                className="hidden"
                                onChange={onChange}
                            />
                        </Wrapper>
                    </Wrapper>
                    <Wrapper className="relative h-full w-full">
                        <AvatarPicture
                            className="w-full h-56 flex flex-col justify-center absolute -top-28 left-12"
                            profilePicture={user.image}
                            profilePictureSize={"h-32 w-32"}
                            username={user.username}
                        />
                        <Wrapper
                            className="absolute left-28 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-10 w-10 bg-black/20 hover:bg-black/50 rounded-full flex justify-center items-center">
                            <Label htmlFor="image">
                                <IconCamera
                                    className="cursor-pointer"
                                    size={24}/>
                            </Label>
                            <Input
                                type="file"
                                id="image"
                                name="image"
                                className="hidden"
                                onChange={onChange}
                            />
                        </Wrapper>
                    </Wrapper>
                </Wrapper>
                <Wrapper className="w-full flex flex-col justify-center items-center relative mb-14 px-4">
                    {fields.map((field: {
                        name: string;
                        value: string;
                        text: string;
                        type: string;
                        onChange: (event: ChangeEvent<HTMLInputElement>) => void;
                        index: number;
                    }) => (
                        <Wrapper
                            className="w-full flex flex-col relative mt-14 rounded-md border-b border-l border-r border-t border-zinc-800"
                            key={field.index}
                        >
                            <Label
                                htmlFor={field.name}
                                className="text-md mt-2 ml-2"
                                label={field.text}
                            />
                            <Input
                                type={field.type}
                                id={field.name}
                                name={field.name}
                                className="w-full border-none bg-transparent text-white text-xl font-bold focus:ring-0 focus:outline-none px-2 py-1"
                                onChange={field.onChange}
                                value={field.value}
                            />
                        </Wrapper>
                    ))}
                </Wrapper>
            </Wrapper>
        </Form>
    )
}

export default UserForm;