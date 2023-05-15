import React from "react";
import s from './Profile.module.css'
import Post from "./MyPosts/Post/Post";
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./MyPosts/ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

type ProfilePropsType = {
    state: {
        posts: Array<PostsType>
        newPostText: string
    },
    dispatch: (action: any) => void
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
            <MyPostsContainer
                posts={props.state.posts}
                dispatch={props.dispatch}
                newPostText={props.state.newPostText}
            />
        </div>
    )
}
export default Profile;