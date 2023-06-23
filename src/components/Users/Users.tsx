import React from 'react';
import styles from './users.module.css';
import {UserType} from "../../redux/users-reducer";
import axios from "axios";
import AvatarPhoto from '../../assets/images/Avatarki.jpg'

type UserResponseType={
    items: UserType[]
    totalCount: number
    error: string|null
}
type UsersProps = {
    users: UserType[];
    setUsers: (users: UserType[]) => void;
    follow: (userId: number) => void;
    unFollow: (userId: number) => void;
}
class Users extends React.Component<UsersProps, any> {
    constructor(props:UsersProps) {
        super(props);
    }
    componentDidMount() {
        axios.get<UserResponseType>('https://social-network.samuraijs.com/api/1.0/users')
            .then(response => {
                this.props.setUsers(response.data.items)
            })
    }

    render() {
        return (
            <div>
               {/* <button onClick={this.getUsers}>Get Users</button>*/}
                {
                    this.props.users.map(u => {
                        return (
                            <div key={u.id}>
                            <span>
                                <div>
                                    <img
                                        alt={'avatar'}
                                        src={u.photos.small !== null ? u.photos.small : AvatarPhoto}
                                        className={styles.userPhoto}/>
                                </div>
                                <div>
                                    {u.followed
                                        ? <button onClick={() => this.props.unFollow(u.id)}>Unfollow</button>
                                        : <button onClick={() => this.props.follow(u.id)}>Follow</button>
                                    }
                                </div>
                            </span>
                                <span>
                                <span>
                                    <div>{u.name}</div>
                                    <div>{u.status}</div>

                                </span>
                                <span>
                                    <div>{"u.location.country"}</div>
                                    <div>{"u.location.city"}</div>
                                </span>
                            </span>
                            </div>)
                    })
                }
            </div>
        )
    }
}

export default Users;