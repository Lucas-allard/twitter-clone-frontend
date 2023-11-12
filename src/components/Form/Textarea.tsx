import {
    ChangeEvent,
    FC,
    ReactElement, RefObject
} from 'react';

interface TextareaProps {
    name: string,
    placeholder: string,
    value: string,
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void,
    className: string,
    textAreaRef: RefObject<HTMLTextAreaElement>
}

const Textarea: FC<TextareaProps> = (
    {
        name,
        placeholder,
        value,
        onChange,
        className,
        textAreaRef
    }
): ReactElement => (
    <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={className}
        ref={textAreaRef}
        rows={1}
    />
);

export default Textarea;