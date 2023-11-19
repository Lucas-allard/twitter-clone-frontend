import {configureStore} from '@reduxjs/toolkit'
import {userSlice} from "./features/user/userSlice.ts";
import {tweetSlice} from "./features/tweet/tweetSlice.ts";

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        tweet: tweetSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch