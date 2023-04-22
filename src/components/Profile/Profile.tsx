import React from "react";
import s from './Profile.module.css'
import Post from "./MyPosts/Post/Post";
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./MyPosts/ProfileInfo/ProfileInfo";

type ProfilePropsType = {
    state: {
        posts: Array<PostsType>
        newPostText: string
    },
    addPost: () => void
    updateNewPostText:(newText: string)=>void
}
type PostsType = {
    id?: number,
    message: string,
    likesCount: number
}
const Profile = (props: ProfilePropsType) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts
                posts={props.state.posts}
                addPost={props.addPost}
                newPostText={props.state.newPostText}
                updateNewPostText={props.updateNewPostText}
            />
        </div>
    )
}
export default Profile;