import {FC, ReactElement} from 'react';

interface LabelProps {
    htmlFor: string;
    label?: string;
    children?: ReactElement;
    className: string;
}

const Label: FC<LabelProps> = (
    {
        htmlFor,
        label,
        children,
        className
    }
): ReactElement => (
    <label htmlFor={htmlFor} className={className}>
        {label}
        {children}
    </label>
);

export default Label;