import React from "react";

import ProfileInfo from "./MyPosts/ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileAPIProps} from "./ProfileContainer";

export type ProfilePropsType = {
    profile: ProfileAPIProps

}
const Profile: React.FC<ProfilePropsType> = ({profile}) => {
    return (
        <div>
            <ProfileInfo profile={profile}/>
            <MyPostsContainer/>
        </div>
    )
}
export default Profile;