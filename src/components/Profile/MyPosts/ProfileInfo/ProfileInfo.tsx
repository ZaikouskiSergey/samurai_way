import React, {ChangeEvent} from "react";
import s from './ProfileInfo.module.css';
import {ProfileAPIProps} from "../../ProfileContainer";
import {Preloader} from "../../../common/Preloader/Preloader";
import {ProfileStatusWithHooks} from "components/Profile/MyPosts/ProfileInfo/ProfileStatusWithHooks";

export type ProfileInfoPropsType = {
    profile: ProfileAPIProps
    status: string
    updateUserStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File)=> void
}
const ProfileInfo: React.FC<ProfileInfoPropsType> = ({profile, status, updateUserStatus, isOwner, savePhoto}) => {
    if (!profile) {
        return <Preloader/>
    }
    const onMainPhotoSelected = (e:ChangeEvent<HTMLInputElement>) => {
        //e.currentTarget.files
        if(e.target.files?.length){
            savePhoto(e.target.files[0])
        }

    }
    return (
        <div>
            <div className={s.picture}>
                <img src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg' alt={'ava'}/>
            </div>
            <div className={s.descriptionBlock}>
                <img
                    src={profile.photos.large ? profile.photos.large : `https://shapka-youtube.ru/wp-content/uploads/2021/02/prikolnaya-avatarka-dlya-patsanov.jpg`}
                    alt={'ava'}
                />
                {isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}

                <h3>{profile.fullName}</h3>
                <ProfileStatusWithHooks status={status} updateUserStatus={updateUserStatus}/>
                <p>{profile.aboutMe}</p>

            </div>
        </div>
    )
}
export default ProfileInfo;