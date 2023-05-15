import React, {ChangeEvent, RefObject} from "react";
import s from './MyPosts.module.css'
import Post from "./Post/Post";



type MyPostsPropsType = {
    posts: Array<PostsType>
    newPostText: string
    updateNewPostText: (text: string) => void
    addPost: () => void
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
    const onAddPost = () => {
        props.addPost()
    }
    const onChangePost = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const text: string = newPostElement.current?.value || ""
        props.updateNewPostText(text)
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea
                        ref={newPostElement}
                        onChange={onChangePost}
                        value={props.newPostText}/>
                </div>
                <div>
                    <button onClick={onAddPost}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>

        </div>
    )
}
export default MyPosts;