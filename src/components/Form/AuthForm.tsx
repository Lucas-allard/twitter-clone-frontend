import Wrapper from "../Wrapper/Wrapper.tsx";
import Form from "../Form/Form.tsx";
import FormError from "./FormError.tsx";
import Label from "./Label.tsx";
import Input from "./Input.tsx";
import Button from "../Commons/Button.tsx";
import {Credentials, FormErrors} from "../../types";
import {
    ChangeEvent,
    FC,
    FormEvent,
    ReactElement
} from "react";

interface AuthFormProps {
    buttonText: string,
    credentials: Credentials,
    errors: FormErrors,
    fields: Array<{
        name: string,
        text: string,
        type: string,
        onChange: (event: ChangeEvent<HTMLInputElement>) => void,
        index: number
    }>
    onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

const AuthForm: FC<AuthFormProps> = (
    {
        buttonText,
        credentials,
        errors,
        fields,
        onSubmit
    }
): ReactElement => {
    return (
        <Form onSubmit={onSubmit} className="flex flex-col lg:w-1/2 2xl:w-full">
            {errors["genericError"] && (
                <FormError
                    error={errors["genericError"]}
                    className="text-red-300 pb-4 break-words w-full lg:w-1/2 xl:w-1/3 ml-2"
                />
            )}
            {fields.map((field) => (
                    <Wrapper className="mb-3 flex flex-col items-center gap-2 w-full" key={field.index}>
                        <Label
                            htmlFor={field.name}
                            label={field.text}
                            className="block w-full lg:w-1/2 xl:w-1/3 ml-2"
                        />
                        {errors[field.name] && (
                            <FormError
                                error={errors[field.name]}
                                className="text-red-300 text-xs italic break-words w-full lg:w-1/2 xl:w-1/3 ml-2"
                            />
                        )}
                        <Input
                            type={field.type}
                            id={field.name}
                            name={field.name}
                            placeholder={field.text}
                            className="border border-gray-400 w-full lg:w-1/2 xl:w-1/3"
                            value={credentials[field.name]}
                            onChange={field.onChange}
                        />
                    </Wrapper>
                )
            )
            }
            <Wrapper className="w-fit my-3 flex flex-col self-center gap-2">
                <Button type="submit" className="button-primary py-2 px-6">
                    {buttonText}
                </Button>
            </Wrapper>
        </Form>
    )
};

export default AuthForm;
