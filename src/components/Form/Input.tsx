import {ChangeEvent, FC, ReactElement} from 'react';

interface InputProps {
    type: string;
    name?: string;
    id?: string;
    placeholder: string;
    value?: string | undefined;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    className: string;

}

const Input: FC<InputProps> = (
    {
        type,
        name,
        id,
        placeholder,
        value,
        onChange,
        className
    }
): ReactElement => (
    <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={className}
    />
);

export default Input;