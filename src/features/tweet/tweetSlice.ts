import {Tweet, TweetResponse} from "../../types";
import {AsyncThunk, createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../store.ts";
import TweetService from "../../services/TweetService.ts";

export const getAllTweets: AsyncThunk<TweetResponse, void, {}> = createAsyncThunk(
    'tweet/getAllTweets',
    async (): Promise<TweetResponse> => {
        return await TweetService.getAll()
    }
)

export const getTweet: AsyncThunk<TweetResponse, string, {}> = createAsyncThunk(
    'tweet/getTweet',
    async (id: string): Promise<TweetResponse> => {
        return await TweetService.get(id)
    }
)

export const createTweet: AsyncThunk<TweetResponse, object, {}> = createAsyncThunk(
    'tweet/createTweet',
    async (tweet: object):  Promise<TweetResponse> => {
        return await TweetService.create(tweet)
    }
)

interface TweetState {
    tweets: Tweet[] | [],
    tweet: Tweet | null,
    loading: boolean,
    error: string | null
}

const initialState: TweetState = {
    tweets: [],
    tweet: null,
    loading: true,
    error: null
}

export const tweetSlice = createSlice({
    name: 'tweet',
    initialState,
    reducers: {},
    extraReducers: {
        [getAllTweets.pending.type]: (state: TweetState) => {
            state.loading = true
        },
        [getAllTweets.fulfilled.type]: (state: TweetState, action: PayloadAction<TweetResponse>): void => {
            state.loading = false
            const unsortedTweet = action.payload.data as Tweet[] || []
            state.tweets = unsortedTweet.sort((a, b) => {
                return new Date(b.date).getTime() - new Date(a.date).getTime()
            })
        },
        [getAllTweets.rejected.type]: (state: TweetState, action: PayloadAction<undefined, string, any, Error>): void => {
            state.loading = true
            state.error = action.error.message
        },
        [getTweet.pending.type]: (state: TweetState) => {
            state.loading = true
        },
        [getTweet.fulfilled.type]: (state: TweetState, action: PayloadAction<TweetResponse>): void => {
            state.loading = false
            state.tweet = action.payload.data as Tweet || {}
        },
        [getTweet.rejected.type]: (state: TweetState, action: PayloadAction<undefined, string, any, Error>): void => {
            state.loading = true
            state.error = action.error.message
        },
        [createTweet.fulfilled.type]: (state: TweetState, action: PayloadAction<TweetResponse>): void => {
            const newTweet: Tweet = action.payload.data as Tweet
            state.tweets = [newTweet, ...state.tweets]
        },
        [createTweet.rejected.type]: (state: TweetState, action: PayloadAction<undefined, string, any, Error>): void => {
            state.error = action.error.message
        },
    }
})

export const {} = tweetSlice.actions

export const selectTweets = (state: RootState) => state.tweet.tweets

export const selectTweet = (state: RootState) => state.tweet.tweet
export const selectTweetLoading = (state: RootState) => state.tweet.loading

export default tweetSlice.reducer