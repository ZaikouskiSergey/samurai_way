import React, {ComponentType} from 'react';
import {connect} from "react-redux";
import {followTC, getUsersTC, setCurrentPage, unFollowTC, UserType} from "redux/users-reducer";
import Users from "./Users";
import {Preloader} from "../common/Preloader/Preloader";
import {compose} from "redux";
import {RootState} from "redux/redux-store";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsersSuperSelector
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
        const {getUsersTC, currentPage, pageSize} = this.props
        getUsersTC(currentPage, pageSize)
    }
    onPageChanged = (currentNumber: number) => {
        const {setCurrentPage, getUsersTC, pageSize} = this.props
        setCurrentPage(currentNumber)
        getUsersTC(currentNumber, pageSize)
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
const mapStateToProps = (state: RootState) => {
    return {
        users: getUsersSuperSelector(state),
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