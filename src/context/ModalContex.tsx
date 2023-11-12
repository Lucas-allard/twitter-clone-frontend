import {createContext, FC, ReactElement, useContext, useState} from 'react';
import {ModalContextProps, ModalProviderProps, ModalState} from "../types";

const ModalContext = createContext<ModalContextProps | undefined>(undefined);
export const ModalProvider: FC<ModalProviderProps> = ({children}: ModalProviderProps): ReactElement => {
    const [activeModal, setActiveModal] = useState<ModalState>({
        isOpen: false,
        type: null,
    });

    const openModal = (modalType: string): void => {
        setActiveModal({
            isOpen: true,
            type: modalType,
        });

        const {body}: { body: HTMLElement } = document;
        body.style.overflow = 'hidden';
    };

    const closeModal = (): void => {
        setActiveModal({
            isOpen: false,
            type: null,
        });

        const {body}: { body: HTMLElement } = document;
        body.style.overflow = 'auto';
    };

    return (
        <ModalContext.Provider value={{activeModal, openModal, closeModal}}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = (): ModalContextProps => {
    const context = useContext(ModalContext);

    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }

    return context;
};
