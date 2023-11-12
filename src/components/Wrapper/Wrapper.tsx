import {FC, ReactElement, ReactNode} from 'react';

interface WrapperProps {
    className?: string | undefined
    children: ReactNode;
    onClick?: () => void;
}

const Wrapper: FC<WrapperProps> = ({className, children, onClick}: WrapperProps): ReactElement => (
    <div
        className={className}
        onClick={onClick}
    >
        {children}
    </div>
);

export default Wrapper;