import React from 'react';
import styles from './users.module.css';
import {UserType} from "../../redux/users-reducer";
import axios from "axios";
import AvatarPhoto from '../../assets/images/Avatarki.jpg'

type UserResponseType = {
    items: UserType[]
    totalCount: number
    error: string | null
}
type UsersProps = {
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

class Users extends React.Component<UsersProps, any> {
    constructor(props: UsersProps) {
        super(props);
    }

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
        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize)
        let pages = []
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }

        return (
            <div>
                <div className={styles.users_pages}> page...
                    {pages.map(p => {
                        return <span className={this.props.currentPage === p ? styles.selectedPage : ''}
                                     onClick={(e) => this.onPageChanged(p)}>{p}</span>
                    })}
                    ...
                </div>

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