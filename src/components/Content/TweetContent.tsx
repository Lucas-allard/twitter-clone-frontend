import {FC, ReactElement} from "react";
import Wrapper from "../Wrapper/Wrapper.tsx";
import {Link} from "react-router-dom";
import {Image} from "../../types";

interface TweetContentProps {
    content: string;
    userName: string;
    tweetId: number;
    images: [] | Image[]
}

const TweetContent: FC<TweetContentProps> = ({content, userName, tweetId, images}: TweetContentProps): ReactElement => {
    return (
        <Link to={`/${userName}/status/${tweetId}`} className="flex flex-col">
            <p className="text-white text-sm">
                {content}
            </p>
            {images.length > 0 &&
                images.map((image: { url: string, alt: string }, index: number) => (
                    <Wrapper className="w-full pt-4" key={index}>
                        <img src={image.url} alt={image.alt} className="rounded-lg"/>
                    </Wrapper>
                ))}
        </Link>

    );
};

export default TweetContent;
