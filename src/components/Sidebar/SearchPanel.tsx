import {IconSearch} from "@tabler/icons-react";
import Wrapper from "../Wrapper/Wrapper.tsx";
import Input from "../Form/Input.tsx";

const SearchPanel = () => {
    return (
        <aside className="sticky top-0 z-10 hidden min-h-screen max-h-screen lg:w-[450px] lg:flex flex-col gap-4 p-4 border-l border-gray-600">
            <Wrapper className="w-[80%] flex flex-row gap-4 bg-gray-600 py-2 px-4 rounded-3xl">
                <IconSearch size={24} color={"#FFFFFF"}/>
                <Input
                    type="text"
                    placeholder="Chercher"
                    className="w-full bg-gray-600 p-0 focus:outline-none focus:ring-0 border-none text-white"
                />
            </Wrapper>
        </aside>)
};

export default SearchPanel;