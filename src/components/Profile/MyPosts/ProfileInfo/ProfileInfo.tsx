import React from "react";
import s from './ProfileInfo.module.css';
import {ProfileAPIProps} from "../../ProfileContainer";
import {Preloader} from "../../../common/Preloader/Preloader";

export type ProfileInfoPropsType ={
    profile: ProfileAPIProps

}

const ProfileInfo: React.FC<ProfileInfoPropsType> = ({profile}) => {
    if (!profile){
        return <Preloader/>
    }
    return (
        <div>
            <div className={s.picture}>
                <img src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg' alt={'ava'}/>
            </div>
            <div className={s.descriptionBlock}>
                <img
                    src={profile.photos.large? profile.photos.large : `https://shapka-youtube.ru/wp-content/uploads/2021/02/prikolnaya-avatarka-dlya-patsanov.jpg`}
                    alt={'ava'}
                />
                <h3>{profile.fullName}</h3>
                <p>{profile.aboutMe}</p>

            </div>
        </div>
    )
}
export default ProfileInfo;