import {Tweet} from "./TweetModel.ts";

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    image: string;
    banner: string;
    tweets: Tweet[];
    bio: string;
    createdAt: string;
    following: string[];
    followers: string[];
}

export interface UserDto {
    name: string;
    bio: string;
    image: string;
    banner: string;
}