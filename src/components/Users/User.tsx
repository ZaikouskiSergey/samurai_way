import React from 'react';
import styles from './users.module.css';
import {UserType} from "redux/users-reducer";
import AvatarPhoto from '../../assets/images/Avatarki.jpg'
import {NavLink} from "react-router-dom";
import Paginator from "components/common/Paginator/Paginator";

type UserProps = {
    user: UserType
    followingInProgress: Array<number>
    followTC: (userId: number) => void
    unFollowTC: (userId: number) => void
}

const User: React.FC<UserProps> = ({user, followingInProgress, followTC, unFollowTC}) => {
    return (
        <div>
            <span>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                        <img
                            alt={'avatar'}
                            src={user.photos.small !== null ? user.photos.small : AvatarPhoto}
                            className={styles.userPhoto}/>
                                    </NavLink>
                </div>
                <div>
                    {user.followed
                        ? <button disabled={followingInProgress.some(id => id === user.id)}
                                  onClick={() => {
                                      unFollowTC(user.id)
                                  }
                                  }>Unfollow</button>
                        : <button disabled={followingInProgress.some(id => id === user.id)}
                                  onClick={() => {
                                      followTC(user.id)
                                  }
                                  }>Follow</button>
                    }
                </div>
            </span>
            <span>
                <span>
                    <div>{user.name}</div>
                    <div>{user.status}</div>

                </span>
                <span>
                    <div>{"u.location.country"}</div>
                                    <div>{"u.location.city"}</div>
                </span>
            </span>
        </div>
    )
}


export default User;