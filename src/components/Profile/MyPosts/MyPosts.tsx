import React, {ChangeEvent, RefObject} from "react";
import s from './MyPosts.module.css'
import Post from "./Post/Post";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";


type MyPostsPropsType = {
    posts: Array<PostsType>
    newPostText: string
    dispatch: (action: any) => void
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
        props.dispatch(addPostActionCreator())
    }
    const onChangePost = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const text: string = newPostElement.current?.value || ""
        //let action = {type: "UPDATE-NEW-POST-TEXT", newText: text};
        props.dispatch(updateNewPostTextActionCreator(text))
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