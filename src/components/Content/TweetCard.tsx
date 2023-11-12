import {Tweet} from "../../types";
import {FC, ReactElement} from "react";
import Wrapper from "../Wrapper/Wrapper.tsx";
import AvatarPicture from "../Avatar/AvatarPicture.tsx";
import TweetInfo from "./TweetInfo.tsx";
import TweetContent from "./TweetContent.tsx";
import CardFeatures from "./CardFeatures.tsx";

interface TweetCardProps {
   tweet: Tweet;
}

const TweetCard: FC<TweetCardProps> = ({tweet}: TweetCardProps): ReactElement => {
    const retweets: number = 69;
    return (
        <Wrapper className="w-full p-4 border-b border-gray-600">
            <Wrapper className="flex flex-row">
                <AvatarPicture
                    profilePicture={tweet.user.image}
                    username={tweet.user.username}
                />
                <Wrapper className="flex flex-col ml-4 w-[90%]">
                    <TweetInfo
                        userName={tweet.user.name}
                        date={tweet.date}
                    />
                    <TweetContent
                        content={tweet.content}
                        images={tweet.images}
                    />
                    <CardFeatures
                        likes={tweet.likes}
                        comments={tweet.comments}
                        postRetweets={retweets}
                    />
                </Wrapper>
            </Wrapper>
        </Wrapper>
    );
}

export default TweetCard;