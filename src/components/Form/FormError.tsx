import {FC, ReactElement} from 'react';

interface FormErrorProps {
    className: string;
    error: string;
}
const FormError: FC<FormErrorProps> = ({className, error}): ReactElement => (
    <span className={className}>{error}</span>
);

export default FormError;