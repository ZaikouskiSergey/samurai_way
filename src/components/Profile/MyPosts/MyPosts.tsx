import React, {ChangeEvent, RefObject} from "react";
import s from './MyPosts.module.css'
import Post from "./Post/Post";
import {Debugger} from "inspector";

type MyPostsPropsType = {
    posts: Array<PostsType>
    addPost: (postMessage: string) => void
}
type PostsType = {
    id?: number,
    message: string,
    likesCount: number
}
const MyPosts = (props: MyPostsPropsType) => {
    let postsElements = props.posts.map(p => (
        <Post message={p.message} likesCount={p.likesCount}/>
    ))
    let newPostElement: RefObject<HTMLTextAreaElement> = React.createRef();
    const addPost = () => {
        debugger
        const text: string = newPostElement.current?.value || ""
        props.addPost(text)
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea ref={newPostElement}></textarea>
                </div>
                <div>
                    <button onClick={addPost}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>

        </div>
    )
}
export default MyPosts;