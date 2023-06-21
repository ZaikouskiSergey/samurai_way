import React from 'react';
import {connect} from "react-redux";
import Users from "./Users";
import {followAC, setUsersAC, unFollowAC, UserType} from "../../redux/users-reducer";


const mapStateToProps = (state: any) => {
    return {
        users: state.usersPage.users
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
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Users)