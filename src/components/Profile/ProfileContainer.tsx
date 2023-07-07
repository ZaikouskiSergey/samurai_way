import React from "react";
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {getUserProfile, setUserProfile} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {usersAPI} from "../../api/api";

export type ProfileAPIProps = {
    aboutMe: string | null
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    fullName: string | null
    contacts: {
        github: string | null
        vk: string | null
        facebook: string | null
        instagram: string | null
        twitter: string | null
        website: string | null
        youtube: string | null
        mainLink: string | null
    }
    photos: {
        small: string | null
        large: string | null
    }
}
type MapStateToPropsType = {
    profile: ProfileAPIProps
}
type MapDispatchPropsType = {
    getUserProfile: (userId:number)=>void
}
type PropsProfileType = MapStateToPropsType & MapDispatchPropsType



class ProfileContainer extends React.Component<any, any> {
    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = 2
        }
        this.props.getUserProfile(userId)
        // usersAPI.getProfile(userId)
        //     .then(response => {
        //         this.props.setUserProfile(response.data)
        //     })
    }
    render() {
        return (
            <div>
                <Profile {...this.props} profile={this.props.profile}/>
            </div>
        )
    }
}

const mapStateToProps = (state: any): MapStateToPropsType => ({
    profile: state.profilePage.profile
})

let withUrlDataContainerComponent = withRouter(ProfileContainer)
export default connect(mapStateToProps, {getUserProfile})(withUrlDataContainerComponent);