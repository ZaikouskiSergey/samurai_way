import React from 'react';
import {UserType} from "redux/users-reducer";
import Paginator from "components/common/Paginator/Paginator";
import User from "components/Users/User";

type UsersProps = {
    users: UserType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    followingInProgress: Array<number>
    followTC: (userId: number) => void
    unFollowTC: (userId: number) => void
    onPageChanged: (p: number) => void
}
type FollowUserResponseType = {
    resultCode: number
    messages: Array<string>
    data: {}
    fieldsErrors: Array<string>
}

const Users: React.FC<UsersProps> = (props) => {
    return (
        <div>
            <Paginator pageSize={props.pageSize}
                       totalUsersCount={props.totalUsersCount}
                       currentPage={props.currentPage}
                       onPageChanged={props.onPageChanged}/>

            {props.users.map(u => <User
                key={u.id} user={u}
                followingInProgress={props.followingInProgress}
                followTC={props.followTC}
                unFollowTC={props.unFollowTC}
            />)}
        </div>
    )
}

export default Users;