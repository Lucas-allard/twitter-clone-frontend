import {FC, ReactElement} from "react";
import Wrapper from "../Wrapper/Wrapper.tsx";

interface TweetContentProps {
    content: string;
    images: Array<{
        url: string;
        alt: string;
    }>;
}
const TweetContent: FC<TweetContentProps> = ({content, images}: TweetContentProps): ReactElement => {
    return (
        <>
            <p className="text-white text-sm">
                {content}
            </p>
            {images.length > 0 &&
                images.map((image: {url: string, alt: string}, index: number) => (
                    <Wrapper className="w-full pt-4" key={index}>
                        <img src={image.url} alt={image.alt} className="rounded-lg"/>
                    </Wrapper>
                ))}
        </>

    );
};

export default TweetContent;
