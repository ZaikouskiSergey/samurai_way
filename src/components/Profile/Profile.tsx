import React from "react";
import ProfileInfo from "./MyPosts/ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileAPIProps} from "./ProfileContainer";

export type ProfilePropsType = {
    profile: ProfileAPIProps
    status: string
    updateUserStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File)=> void
}
const Profile: React.FC<ProfilePropsType> = ({profile, status, updateUserStatus, isOwner, savePhoto}) => {
    return (
        <div>
            <ProfileInfo
                isOwner={isOwner}
                profile={profile}
                status={status}
                updateUserStatus={updateUserStatus}
                savePhoto={savePhoto}/>
            <MyPostsContainer/>
        </div>
    )
}
export default Profile;