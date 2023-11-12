import httpModule from "../utils/httpModule.ts";
import {TWEET_URL} from "../config/apiConfig.ts";
import {Tweet} from "../types";


const tweetService = {
    get: <T>(id: string): Promise<T> => httpModule.get<T>({url: `${TWEET_URL}/${id}`}),
    getAll: (): Promise<Tweet[]> => httpModule.get<Tweet[]>({ url: `${TWEET_URL}` }),
    create: <T>(body: T): Promise<T> => httpModule.post<T>({url: `${TWEET_URL}`, body}),
    update: <T>(id: string, body: T): Promise<T> => httpModule.put<T>({url: `${TWEET_URL}/${id}`, body}),
    delete: <T>(id: string): Promise<T> => httpModule.delete<T>({url: `${TWEET_URL}/${id}`}),
}
export default tweetService;