import {FC, ReactElement, ReactNode} from "react";
import Wrapper from "../Wrapper/Wrapper.tsx";
import Button from "../Commons/Button.tsx";
import {useModal} from "../../context/ModalContex.tsx";
import {ModalContextProps} from "../../types";

interface ModalProps {
    children: ReactNode
}
const Modal: FC<ModalProps> = ({children}: ModalProps): ReactElement | null => {
    const {activeModal, closeModal} : ModalContextProps = useModal();
    const {isOpen} : {isOpen: boolean} = activeModal;

    if (!isOpen) return null;

    return (
        <Wrapper className="fixed top-0 left-0 z-20 w-full h-full flex justify-center items-center bg-[#5b708366]">
            <Wrapper className="fixed top-12 z-50 bg-black w-full max-w-md rounded-lg p-4 shadow-md">
                <Wrapper className="flex justify-start">
                    <Button
                        className="text-white"
                        onClick={() => closeModal()}
                    >
                        X
                    </Button>
                </Wrapper>
                <Wrapper className="flex flex-col justify-center items-center">
                    {children}
                </Wrapper>
            </Wrapper>
        </Wrapper>
    )
}

export default Modal;