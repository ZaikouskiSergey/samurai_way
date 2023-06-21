import React from 'react';
import styles from './users.module.css';
import {UserType} from "../../redux/users-reducer";
import axios from "axios";
import AvatarPhoto from '../../assets/images/Avatarki.jpg'

type UsersPropsType = {
    users: UserType[]
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    setUsers: (users: UserType[]) => void

}
const Users: React.FC<UsersPropsType> = ({users, follow, unFollow, setUsers}) => {
    if (users.length === 0 ) {
        axios.get('https://social-network.samuraijs.com/api/1.0/users')
            .then(response=>{
                setUsers(response.data.items)

        })
    }

    return (
        <div>
            {
                users.map(u => {
                    return (
                        <div key={u.id}>
                            <span>
                                <div>
                                    <img
                                        alt={'avatar'}
                                        src={u.photos.small !==null ? u.photos.small : AvatarPhoto}
                                        className={styles.userPhoto}/>
                                </div>
                                <div>
                                    {u.followed
                                        ? <button onClick={() => unFollow(u.id)}>Unfollow</button>
                                        : <button onClick={() => follow(u.id)}>Follow</button>
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
        ;
};

export default Users;