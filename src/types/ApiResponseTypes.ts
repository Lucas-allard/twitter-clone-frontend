import {Tweet} from "./TweetModel.ts";
import {User} from "./UserModel.ts";

export interface ApiResponse<T> {
    message: string,
    code: number,
    data?: T
}

export interface SignupResponse extends ApiResponse<{token: string, user: User}> {
    data?: {
        token: string,
        user: User
    }
}

export interface LoginResponse extends ApiResponse<{ token: string, user: User }> {
    data?: {
        token: string,
        user: User
    }
}

export interface TweetResponse extends ApiResponse<Tweet[] | Tweet> {
    data?: Tweet[] | Tweet
}