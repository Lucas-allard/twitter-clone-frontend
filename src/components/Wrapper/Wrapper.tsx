import {FC, KeyboardEventHandler, MouseEventHandler, ReactElement, ReactNode} from 'react';

interface WrapperProps {
    className?: string | undefined
    children?: ReactNode;
    onClick?: MouseEventHandler<HTMLDivElement> | undefined
    onKeyDown?: KeyboardEventHandler<HTMLDivElement> | undefined;
    reference?: any;
}

const Wrapper: FC<WrapperProps> = ({className, children, onClick, onKeyDown, reference}: WrapperProps): ReactElement => (
    <div
        className={className}
        onClick={onClick}
        onKeyDown={onKeyDown}
        ref={reference}
    >
        {children}
    </div>
);

export default Wrapper;