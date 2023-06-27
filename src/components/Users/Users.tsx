import React from 'react';
import styles from './users.module.css';
import {UserType} from "../../redux/users-reducer";
import AvatarPhoto from '../../assets/images/Avatarki.jpg'

type UsersProps = {
    users: UserType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    onPageChanged: (p: number) => void
}

const Users: React.FC<UsersProps> =(props)=> {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let pagesShow = props.currentPage> 10
        ? pages.slice(props.currentPage-5, props.currentPage+10)
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
                                    <img
                                        alt={'avatar'}
                                        src={u.photos.small !== null ? u.photos.small : AvatarPhoto}
                                        className={styles.userPhoto}/>
                                </div>
                                <div>
                                    {u.followed
                                        ? <button onClick={() => props.unFollow(u.id)}>Unfollow</button>
                                        : <button onClick={() => props.follow(u.id)}>Follow</button>
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