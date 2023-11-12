import {FC, ReactElement} from "react";
import Wrapper from "../Wrapper/Wrapper.tsx";
import {formatDate} from "../../utils/formatDate.ts";

interface TweetInfoProps {
    userName: string;
    date: string;
}

const TweetInfo: FC<TweetInfoProps> = ({ userName, date }: TweetInfoProps): ReactElement => {
    return (
        <Wrapper className="flex flex-row text-white">
            <p className="font-bold hover:underline">{userName}</p>
            <p className="text-gray-400 ml-2">{formatDate(date)}</p>
        </Wrapper>
    );
};

export default TweetInfo;
