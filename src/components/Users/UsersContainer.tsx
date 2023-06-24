import React from 'react';
import {connect} from "react-redux";
import {
    followAC,
    setCurrentPageAC,
    setTotalUsersCountAC,
    setUsersAC,
    unFollowAC,
    UserType
} from "../../redux/users-reducer";

import axios from "axios";
import Users from "./Users";

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
    setUsers: (users: UserType[]) => void
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    setCurrentPage: (currentPage: number) => void
    setTotalUsersCount: (totalCount: number) => void
}
class UsersContainer extends React.Component<UsersAPIProps, any> {

    componentDidMount() {
        axios.get<UserResponseType>(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount)
            })
    }

    onPageChanged = (currentNumber:number) => {
        this.props.setCurrentPage(currentNumber)
        axios.get<UserResponseType>(`https://social-network.samuraijs.com/api/1.0/users?page=${currentNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
            })
    }
    render() {
        return <Users
            users={this.props.users}
            pageSize={this.props.pageSize}
            totalUsersCount={this.props.totalUsersCount}
            currentPage={this.props.currentPage}
            follow={this.props.follow}
            unFollow={this.props.unFollow}
            onPageChanged={this.onPageChanged}
        />
    }
}
const mapStateToProps = (state: any) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage
    }
}
const mapDispatchToProps = (dispatch:any) => {
    return {
        follow: (userId: number) =>{
            dispatch(followAC(userId))
        },
        unFollow: (userId: number) =>{
            dispatch(unFollowAC(userId))
        },
        setUsers: (users:UserType[])=>{
            dispatch(setUsersAC(users))
        },
        setCurrentPage:(currentPage:number)=>{
            dispatch(setCurrentPageAC(currentPage))
        },
        setTotalUsersCount:(totalCount:number)=>{
            dispatch(setTotalUsersCountAC(totalCount))
        }


    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)