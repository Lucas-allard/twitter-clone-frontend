import {User} from "./UserModel.ts";
import {Like} from "./LikeModel.ts";
import {Comment} from "./CommentModel.ts";
import {Image} from "./ImageModel.ts";


export interface Tweet {
    id: number;
    user: User;
    images: Array<Image>;
    date: string;
    content: string;
    likes: Array<Like>
    comments: Array<Comment>
}