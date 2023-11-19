import {FC, ReactElement} from "react";
import Wrapper from "../Wrapper/Wrapper.tsx";

const Loading: FC = (): ReactElement => {
    return (
        <Wrapper className="flex items-center justify-center h-screen">
            <Wrapper className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500 border-t-blue-700"/>
            <Wrapper className="ml-4 text-xl font-semibold text-gray-700">Chargement...</Wrapper>
        </Wrapper>
    );
};

export default Loading;
