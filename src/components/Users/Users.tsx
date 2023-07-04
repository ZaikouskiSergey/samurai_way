import React from 'react';
import styles from './users.module.css';
import {UserType} from "../../redux/users-reducer";
import AvatarPhoto from '../../assets/images/Avatarki.jpg'
import {NavLink} from "react-router-dom";
import axios from "axios";

type UsersProps = {
    users: UserType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    onPageChanged: (p: number) => void
    toggleFollowingProgress: (followingInProgress: boolean, userId: number) => void
}
type FollowUserResponseType = {
    resultCode: number
    messages: Array<string>
    data: {}
    fieldsErrors: Array<string>

}

const Users: React.FC<UsersProps> = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let pagesShow = props.currentPage > 10
        ? pages.slice(props.currentPage - 5, props.currentPage + 10)
        : pages.slice(0, 11)
    return (
        <div>
            <div className={styles.users_pages}> page...
                {pagesShow.map(p => {
                    return <span className={props.currentPage === p ? styles.selectedPage : ''}
                                 onClick={(e) => props.onPageChanged(p)}>{p}</span>
                })}
                ...
            </div>

            {
                props.users.map(u => {
                    return (
                        <div key={u.id}>
                            <span>
                                <div>
                                    <NavLink to={'/profile/' + u.id}>
                                    <img
                                        alt={'avatar'}
                                        src={u.photos.small !== null ? u.photos.small : AvatarPhoto}
                                        className={styles.userPhoto}/>
                                    </NavLink>
                                </div>
                                <div>
                                    {u.followed
                                        ? <button disabled={props.followingInProgress.some(id => id === u.id)}
                                                  onClick={() => {
                                                      props.toggleFollowingProgress(true, u.id)
                                                      axios.delete<FollowUserResponseType>(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                                                          withCredentials: true,
                                                          headers: {
                                                              "API-KEY": "8367578b-61db-4643-ae1c-c73f2e728d1b"
                                                          }
                                                      })
                                                          .then(response => {
                                                              if (response.data.resultCode === 0) {
                                                                  props.unFollow(u.id)
                                                              }
                                                              props.toggleFollowingProgress(false, u.id)
                                                          })

                                                  }}>Unfollow</button>
                                        : <button disabled={props.followingInProgress.some(id => id === u.id)}
                                                  onClick={() => {
                                                      props.toggleFollowingProgress(true,  u.id)
                                                      axios.post<FollowUserResponseType>(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                                                          withCredentials: true,
                                                          headers: {
                                                              "API-KEY": "8367578b-61db-4643-ae1c-c73f2e728d1b"
                                                          }
                                                      })
                                                          .then(response => {
                                                              if (response.data.resultCode === 0) {
                                                                  props.follow(u.id)
                                                              }
                                                              props.toggleFollowingProgress(false,  u.id)
                                                          })
                                                  }}>Follow</button>
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

export default Users;