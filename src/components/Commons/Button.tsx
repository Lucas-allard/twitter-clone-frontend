import  {FC, ReactElement, ReactNode, MouseEvent} from 'react';

interface ButtonProps {
    type?: "button" | "submit" | "reset";
    className: string;
    children: ReactNode;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;

}

const Button: FC<ButtonProps> = (
    {
        type = "button",
        className,
        children,
        onClick
    }
): ReactElement => (
    <button
        type={type}
        className={className}
        onClick={onClick}
    >
        {children}
    </button>
);

export default Button;