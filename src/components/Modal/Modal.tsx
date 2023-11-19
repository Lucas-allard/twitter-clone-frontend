import {FC, MouseEventHandler, ReactElement, ReactNode, useEffect} from "react";
import Wrapper from "../Wrapper/Wrapper.tsx";
import Button from "../Commons/Button.tsx";
import {useModal} from "../../context/ModalContex.tsx";

interface ModalProps {
    children: ReactNode;
    modalType: string;
}
const Modal: FC<ModalProps> = ({children, modalType}: ModalProps): ReactElement | null => {
    const {activeModal, closeModal} = useModal();
    const {modalStack, modals} = activeModal;
    const isModalOpen = modalStack.includes(modalType) && modals[modalType];

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent): void => {
            if (event.key === "Escape") {
                closeModal();
            }
        };

        if (isModalOpen) {
            const body = document.body;
            body.style.overflow = "hidden";
            document.addEventListener("keydown", handleKeyDown);

            return () => {
                body.style.overflow = "auto";
                document.removeEventListener("keydown", handleKeyDown);
            };
        }
    }, [isModalOpen, modalType, closeModal]);

    const onClickOutside: MouseEventHandler<HTMLDivElement> = (event): void => {
        if (event.target === event.currentTarget) {
            closeModal();
        }
    };

    if (!isModalOpen) return null;

    const modalClassName = modalType === "gif" ? "modal-gif" : "";

    return (
        <Wrapper
            className="fixed top-0 left-0 z-20 w-full h-full flex justify-center items-center bg-[#5b708366]"
            onClick={onClickOutside}
        >
            <Wrapper
                className={`fixed top-12 z-50 bg-black w-full max-w-lg rounded-lg shadow-md ${modalClassName}`}
            >
                <Wrapper className="flex justify-start py-4 px-4 ">
                    <Button className="text-white" onClick={() => closeModal()}>
                        X
                    </Button>
                </Wrapper>
                <Wrapper className="flex flex-col justify-center items-center">
                    {children}
                </Wrapper>
            </Wrapper>
        </Wrapper>
    );
};

export default Modal;