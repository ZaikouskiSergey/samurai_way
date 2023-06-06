import React from "react";
import s from './Profile.module.css'
import Post from "./MyPosts/Post/Post";
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./MyPosts/ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {StoreType} from "../../redux/store";

// type ProfilePropsType = {
//     store: StoreType
//
//     /* state: {
//          posts: Array<PostsType>
//          newPostText: string
//      },
//      dispatch: (action: any) => void*/
// }
// type PostsType = {
//     id?: number,
//     message: string,
//     likesCount: number
// }
const Profile = () => {
    return (
        <div>
            <ProfileInfo/>
            <MyPostsContainer/>
        </div>
    )
}
export default Profile;