import React from "react";
import s from './MyPosts.module.css'
import Post from "./Post/Post";

type MyPostsPropsType = {
    id?: number,
    message?: string,
    likesCount?: number
}
const MyPosts = (props:MyPostsPropsType) => {
    let posts = [
        {id:1, message:'Hi, how are you?', likesCount: 15},
        {id:2, message:"It's my first post", likesCount: 20}
    ]
    let postsElements = posts.map(message => (
        <Post message={message.message} likesCount={message.likesCount}/>
    ))

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea></textarea>
                </div>
                <div>
                    <button>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>

        </div>
    )
}
export default MyPosts;