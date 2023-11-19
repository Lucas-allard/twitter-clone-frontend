import {FC, ReactElement} from "react";
import Wrapper from "../Wrapper/Wrapper.tsx";
import {formatDate} from "../../utils/formatDate.ts";
import {Link} from "react-router-dom";

interface TweetInfoProps {
    userName: string;
    userId: number;
    date: string;
}

const TweetInfo: FC<TweetInfoProps> = ({userName, userId, date}: TweetInfoProps): ReactElement => {
    return (
        <Wrapper className="flex flex-row text-white">
            <Link to={`/${userName}/${userId}`} className="flex flex-row items-center">
                <p className="font-bold hover:underline">{userName}</p>
                <p className="text-gray-400 ml-2">{formatDate(date)}</p>
            </Link>
        </Wrapper>
    );
};

export default TweetInfo;
