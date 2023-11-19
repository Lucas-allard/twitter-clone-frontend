import {FormEvent, useRef, useState} from "react";
import {IGif} from "@giphy/js-types";
import {Image} from "../../types";
import {useAppDispatch, useAppSelector} from "../../hooks.ts";
import {selectUser} from "../../features/user/userSlice.ts";
import useAutosizeTextarea from "../../hooks/useAutosizeTextarea.ts";
import Form from "./Form.tsx";
import Wrapper from "../Wrapper/Wrapper.tsx";
import AvatarPicture from "../Avatar/AvatarPicture.tsx";
import Textarea from "./Textarea.tsx";
import FormFeatures from "./FormFeatures.tsx";
import Button from "../Commons/Button.tsx";

const CommentForm = () => {
    const [value, setValue] = useState<string>('');
    const [selectedGifs, setSelectedGifs] = useState<IGif[]>([]);
    const [images, setImages] = useState<Image[]>([]);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    useAutosizeTextarea(textAreaRef.current, value)

    const onChange = (event: FormEvent<HTMLTextAreaElement>): void => {
        const {value}: { value: string } = event.currentTarget;
        setValue(value);
    }

    const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
    }

    return (
        <Form className="w-full p-4" onSubmit={onSubmit}>
            <Wrapper className="flex flex-row">
                <AvatarPicture
                    profilePicture="https://via.placeholder.com/150"
                    username="John Doe"
                />
                <Wrapper className="flex flex-col ml-4 w-full">
                    <Textarea
                        name="name"
                        placeholder="Quoi de neuf ?!"
                        textAreaRef={textAreaRef}
                        value={value}
                        onChange={onChange}
                        className="w-[95%] text-xl"
                    />
                    {selectedGifs.map((selectedGif, index) => (
                        <Wrapper key={index} className="mb-2">
                            <img
                                src={selectedGif.images.fixed_height.url}
                                alt={selectedGif.title}
                                className="w-[300px] h-[300px] object-cover rounded-xl"
                            />
                        </Wrapper>
                    ))}
                    <Wrapper className="flex justify-between ">
                        <FormFeatures
                            setSelectedGifs={setSelectedGifs}
                            setValue={setValue}
                            setImages={setImages}
                        />
                        <Button className="button-primary py-2 px-6" type={"submit"}>Poster</Button>
                    </Wrapper>
                </Wrapper>
            </Wrapper>
        </Form>
    )
}
export default CommentForm;