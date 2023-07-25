import React from "react";
import ProfileInfo from "./MyPosts/ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileAPIProps} from "./ProfileContainer";

export type ProfilePropsType = {
    profile: ProfileAPIProps
    status: string
    updateUserStatus: (status: string) => void

}
const Profile: React.FC<ProfilePropsType> = ({profile, status, updateUserStatus}) => {
    return (
        <div>
            <ProfileInfo profile={profile} status={status} updateUserStatus={updateUserStatus}/>
            <MyPostsContainer/>
        </div>
    )
}
export default Profile;