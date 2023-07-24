import React, {ComponentType} from 'react';
import {connect} from "react-redux";
import {
    followTC, getUsersTC,
    setCurrentPage,
    unFollowTC,
    UserType
} from "../../redux/users-reducer";
import Users from "./Users";
import {Preloader} from "../common/Preloader/Preloader";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";
import {RootState} from "redux/redux-store";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "redux/users-selectors";

type UserResponseType = {
    items: UserType[]
    totalCount: number
    error: string | null
}
type UsersAPIProps = {
    users: UserType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
    getUsersTC: (currentPage: number, pageSize: number) => void
    followTC: (userId: number) => void
    unFollowTC: (userId: number) => void
    setCurrentPage: (currentPage: number) => void

}

class UsersContainer extends React.Component<UsersAPIProps, any> {
    componentDidMount() {
        this.props.getUsersTC(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (currentNumber: number) => {
        this.props.setCurrentPage(currentNumber)
        this.props.getUsersTC(currentNumber, this.props.pageSize)
    }

    render() {
        return <>
            {this.props.isFetching && <Preloader/>}
            <Users
                users={this.props.users}
                pageSize={this.props.pageSize}
                totalUsersCount={this.props.totalUsersCount}
                currentPage={this.props.currentPage}
                followTC={this.props.followTC}
                unFollowTC={this.props.unFollowTC}
                onPageChanged={this.onPageChanged}
                followingInProgress={this.props.followingInProgress}

            />
        </>
    }
}

// const mapStateToProps = (state: RootState) => {
//     return {
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followingInProgress: state.usersPage.followingInProgress
//     }
// }
const mapStateToProps = (state: RootState) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}


export default compose<ComponentType>(
    connect(mapStateToProps, {followTC, unFollowTC, getUsersTC, setCurrentPage})
)(UsersContainer)