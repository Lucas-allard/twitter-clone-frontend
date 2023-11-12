import {ReactNode} from "react";

export interface ModalState {
    isOpen: boolean;
    type: string | null;
}

export interface ModalContextProps {
    activeModal: ModalState;
    openModal: (modalType: string) => void;
    closeModal: () => void;
}

export interface ModalProviderProps {
    children: ReactNode;
}