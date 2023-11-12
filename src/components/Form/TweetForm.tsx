import {FC, FormEvent, ReactElement, useRef, useState} from "react";
import useAutosizeTextarea from "../../hooks/useAutosizeTextarea.ts";
import Form from "./Form.tsx";
import Wrapper from "../Wrapper/Wrapper.tsx";
import AvatarPicture from "../Avatar/AvatarPicture.tsx";
import Textarea from "./Textarea.tsx";
import Button from "../Commons/Button.tsx";

const TweetForm: FC = (): ReactElement => {
    const [value, setValue] = useState<string>('');
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useAutosizeTextarea(textAreaRef.current, value)

    const onChange = (event: FormEvent<HTMLTextAreaElement>): void => {
        const {value}: { value: string } = event.currentTarget;
        setValue(value);
    }

    const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        // const tweet = JSON.stringify({
        //     author: 'John Doe',
        //     content: value
        // });

        // const newTweet = tweetService.create(tweet);
    }

    return (
        <Form className="w-full p-4" onSubmit={onSubmit}>
            <Wrapper className="flex flex-row justify-between">
                <AvatarPicture
                    profilePicture="https://via.placeholder.com/150"
                    username="John Doe"
                />
                <Textarea
                    name="name"
                    placeholder="Quoi de neuf ?!"
                    textAreaRef={textAreaRef}
                    value={value}
                    onChange={onChange}
                    className="w-[95%] text-xl"
                />
            </Wrapper>
            <Wrapper className="py-4 flex justify-end">
                <Button className="button-primary py-2 px-6">Poster</Button>
            </Wrapper>
        </Form>
    )
};

export default TweetForm;