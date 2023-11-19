import {ReactNode} from "react";

export interface ModalState {
    modalStack: string[];
    modals: Record<string, boolean>;
}


export interface ModalContextProps {
    activeModal: ModalState;
    openModal: (modalType: string) => void;
    closeModal: () => void;
}

export interface ModalProviderProps {
    children: ReactNode;
}