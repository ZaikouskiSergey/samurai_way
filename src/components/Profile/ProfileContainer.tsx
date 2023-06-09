import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile, getUserStatus, updateUserStatus} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {RootState} from "../../redux/redux-store";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";


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
    profile: ProfileAPIProps | null
    isAuth: boolean
    status: string
}
type MapDispatchPropsType = {
    getUserProfile: (userId: number) => void
    getUserStatus: (userId: number) => void
    updateUserStatus: (status: string) => void
}
type PropsProfileType = MapStateToPropsType & MapDispatchPropsType

class ProfileContainer extends React.Component<any, any> {
    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = 29127
        }
        this.props.getUserProfile(userId)
        this.props.getUserStatus(userId)
    }

    render() {
        return (
            <div>
                <Profile {...this.props}
                         profile={this.props.profile}
                         status={this.props.status}
                         updateUserStatus={this.props.updateUserStatus}
                />
            </div>
        )
    }
}

const mapStateToProps = (state: RootState) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status
})


//let AuthRedirectComponent = WithAuthRedirect(ProfileContainer)
//let withUrlDataContainerComponent = withRouter(ProfileContainer)
export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getUserStatus,updateUserStatus}),
    withRouter,
    WithAuthRedirect
)(ProfileContainer)


