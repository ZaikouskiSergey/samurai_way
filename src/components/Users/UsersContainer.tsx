import React from 'react';
import {connect} from "react-redux";
import {
    follow,
    setCurrentPage,
    setTotalUsersCount,
    setUsers, toggleIsFetching,
    unFollow,
    UserType
} from "../../redux/users-reducer";
import Users from "./Users";
import {Preloader} from "../common/Preloader/Preloader";
import {usersAPI} from "../../api/api";

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
    setUsers: (users: UserType[]) => void
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    setCurrentPage: (currentPage: number) => void
    setTotalUsersCount: (totalCount: number) => void
    toggleIsFetching: (isFetching: boolean) => void

}

class UsersContainer extends React.Component<UsersAPIProps, any> {
    componentDidMount() {
        this.props.toggleIsFetching(true)

        usersAPI.getUsers(this.props.currentPage, this.props.pageSize)
            .then(data => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(data.items)
                this.props.setTotalUsersCount(data.totalCount)
            })
    }
    onPageChanged = (currentNumber: number) => {
        this.props.setCurrentPage(currentNumber)
        this.props.toggleIsFetching(true)
        usersAPI.getUsers(currentNumber, this.props.pageSize)
            .then(data => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(data.items)
            })
    }

    render() {
        return <>
            {this.props.isFetching && <Preloader/>}
            <Users
                users={this.props.users}
                pageSize={this.props.pageSize}
                totalUsersCount={this.props.totalUsersCount}
                currentPage={this.props.currentPage}
                follow={this.props.follow}
                unFollow={this.props.unFollow}
                onPageChanged={this.onPageChanged}

            />
        </>
    }
}

const mapStateToProps = (state: any) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching
    }
}
/*const mapDispatchToProps = (dispatch: any) => {
    return {
        follow: (userId: number) => {
            dispatch(followAC(userId))
        },
        unFollow: (userId: number) => {
            dispatch(unFollowAC(userId))
        },
        setUsers: (users: UserType[]) => {
            dispatch(setUsersAC(users))
        },
        setCurrentPage: (currentPage: number) => {
            dispatch(setCurrentPageAC(currentPage))
        },
        setTotalUsersCount: (totalCount: number) => {
            dispatch(setTotalUsersCountAC(totalCount))
        },
        toggleIsFetching: (isFetching: boolean)=>{
            dispatch(toggleIsFetchingAC(isFetching))
        }


    }
}*/
export default connect(mapStateToProps, {
        follow,
        unFollow,
        setUsers,
        setCurrentPage,
        setTotalUsersCount,
        toggleIsFetching
    }
)(UsersContainer)