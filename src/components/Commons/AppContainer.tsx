import {FC, ReactElement, ReactNode} from 'react';

interface AppContainerProps {
    children: ReactNode;

}

const AppContainer: FC<AppContainerProps> = ({children}: AppContainerProps): ReactElement => (
    <div className="relative bg-black min-h-screen grid grid-cols-[auto] md:grid-cols-[auto_1fr] lg:grid-cols-[auto_1fr_450px]">
        {children}
    </div>
);

export default AppContainer;