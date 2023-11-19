import {createContext, FC, ReactElement, useContext, useState} from 'react';
import {ModalContextProps, ModalProviderProps, ModalState} from "../types";

const ModalContext = createContext<ModalContextProps | undefined>(undefined);
export const ModalProvider: FC<ModalProviderProps> = ({children}: ModalProviderProps): ReactElement => {
    const [activeModal, setActiveModal] = useState<ModalState>({
        modalStack: [],
        modals: {},
    });

    const openModal = (modalType: string): void => {
        setActiveModal((prev) => {
            const updatedStack = [...prev.modalStack, modalType];
            const updatedModals = { ...prev.modals, [modalType]: true };

            return {
                modalStack: updatedStack,
                modals: updatedModals,
            };
        });
    };

    const closeModal = (): void => {
        setActiveModal((prev) => {
            const updatedStack = [...prev.modalStack];
            const removedModal = updatedStack.pop();

            if (removedModal) {
                const updatedModals = { ...prev.modals, [removedModal]: false };

                return {
                    modalStack: updatedStack,
                    modals: updatedModals,
                };
            }

            return prev;
        });
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
