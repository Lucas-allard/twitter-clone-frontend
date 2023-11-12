import {FC, ReactElement} from 'react';

interface LabelProps {
    htmlFor: string;
    label: string;
    className: string;
}

const Label: FC<LabelProps> = (
    {
        htmlFor,
        label,
        className
    }
): ReactElement => (
    <label htmlFor={htmlFor} className={className}>
        {label}
    </label>
);

export default Label;