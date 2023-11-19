import {FC, ReactElement, useContext, useEffect, useRef, useState} from "react";
import {IGif} from "@giphy/js-types";
import {
    Grid,
    SearchBar,
    SearchContext,
    SearchContextManager,
    SuggestionBar
} from '@giphy/react-components'
import Wrapper from "../Wrapper/Wrapper.tsx";

interface GifPickerProps {
    onGifClick: (IGif: IGif) => void;
}

const GifPicker: FC<GifPickerProps> = ({onGifClick}: GifPickerProps): ReactElement => {

    return (
        <Wrapper className="max-w-full">
            <SearchContextManager apiKey={import.meta.env.VITE_GIPHY_API_KEY}>
                <GifGrid onGifClick={onGifClick}/>
            </SearchContextManager>
        </Wrapper>
    );
}

interface GifGridProps {
    onGifClick: (IGif: IGif) => void;
}

const GifGrid: FC<GifGridProps> = ({onGifClick}: GifGridProps): ReactElement => {
    const {fetchGifs, searchKey} = useContext(SearchContext);
    const [parentWidth, setParentWidth] = useState<number>(0);
    const parentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateParentWidth = () => {
            if (parentRef.current) {
                setParentWidth((parentRef.current.offsetWidth - 12) * 2);
            }

        }
        updateParentWidth();
        window.addEventListener('resize', updateParentWidth);
        return () => {
            window.removeEventListener('resize', updateParentWidth);
        }
    }, []);

    return (
        <Wrapper reference={parentRef} className="w-full">
            <SearchBar className="my-2"/>
            <Wrapper className="flex flex-row justify-between items-center gap-6">
                <SuggestionBar/>
            </Wrapper>
            <Grid
                key={searchKey}
                columns={3}
                fetchGifs={fetchGifs}
                onGifClick={onGifClick}
                width={parentWidth} // Pass the parentWidth as the width prop
                gutter={6}
                noLink={true}
                className="mx-auto my-4"
            />
        </Wrapper>
    );
};

export default GifPicker;
