import httpModule from "../utils/httpModule.ts";
import { TWEET_URL } from "../config/apiConfig.ts";
import { TweetResponse } from "../types";

const tweetService = {
    getAll: (): Promise<TweetResponse> => httpModule.get({ url: TWEET_URL }),
    get: (id: string): Promise<TweetResponse> => httpModule.get({ url: `${TWEET_URL}/${id}` }),
    create: (data: object): Promise<TweetResponse> => httpModule.post({ url: TWEET_URL, body: data})
}

export default tweetService;
