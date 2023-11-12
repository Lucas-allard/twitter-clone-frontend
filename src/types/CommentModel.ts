import {User} from "./UserModel.ts";
import {Like} from "./LikeModel.ts";

export interface Comment {
    id: number;
    userId: number;
    postId: number;
    user: User;
    date: string;
    content: string;
    likes: Array<Like>
}