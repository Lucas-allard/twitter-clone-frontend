import {
    FC,
    FormEvent,
    ReactElement,
    ReactNode
} from 'react';

interface FormProps {
    className?: string;
    children: ReactNode;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const Form: FC<FormProps> = (
    {
        className,
        children,
        onSubmit
    }
): ReactElement => (
    <form className={className} onSubmit={onSubmit}>
        {children}
    </form>
);

export default Form;