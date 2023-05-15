import React from "react";

import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";


type MyContainerPostsPropsType = {
    posts: Array<PostsType>
    newPostText: string
    dispatch: (action: any) => void
}
type PostsType = {
    id?: number,
    message: string,
    likesCount: number

}

const MyPostsContainer = (props: MyContainerPostsPropsType) => {
    const addPost = () => {
        props.dispatch(addPostActionCreator())
    }
    const onChangePost = (text: string) => {
        let action = {type: "UPDATE-NEW-POST-TEXT", newText: text};
        props.dispatch(updateNewPostTextActionCreator(text))
    }

    return (
        <MyPosts
        updateNewPostText={onChangePost}
        addPost={addPost}
        posts={props.posts}
        newPostText={props.newPostText}
    />)
}
export default MyPostsContainer;