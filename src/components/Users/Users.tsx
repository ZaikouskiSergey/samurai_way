import React from 'react';
import styles from './users.module.css';
import {UserType} from "../../redux/users-reducer";

type UsersPropsType = {
    users: UserType[]
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    setUsers: (users: UserType[]) => void

}
const Users: React.FC<UsersPropsType> = ({users, follow, unFollow, setUsers}) => {
    if (users.length === 0 ) {
        setUsers(
            [
                {
                    id: 1,
                    photoUrl: 'https://img.lovepik.com/element/40128/7461.png_1200.png',
                    followed: false,
                    fullName: "Dmitry",
                    status: 'I am Belarusian',
                    location: {city: 'Minsk', country: 'Belarus'}
                },
                {
                    id: 2,
                    photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjalMHZtOx9E1-R8UPY0O8TJTjnt5yGWVUQl5cBajLNbb_4cP4grpYikWYOIna05-ksgU&usqp=CAU',
                    followed: false,
                    fullName: "Vanya",
                    status: 'I am Russian',
                    location: {city: 'Moscow', country: 'Russia'}
                },
                {
                    id: 3,
                    photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-_cyYC_5sdRL1ME2r7XRjGVeES9UnSLtQjQ4VbM7yizsUiRCckgvBn78EkrhXZFRcfCk&usqp=CAU',
                    followed: false,
                    fullName: "Andrew",
                    status: 'I am Ukrainian',
                    location: {city: 'Kiev', country: 'Ukraine'}
                },
                {
                    id: 4,
                    photoUrl: 'https://png.pngtree.com/element_our/20190528/ourlarge/pngtree-520-boy-avatar-image_1153284.jpg',
                    followed: false,
                    fullName: "John",
                    status: 'I am American',
                    location: {city: 'Calgary', country: 'USA'}
                },
            ])
    }

    return (
        <div>
            {
                users.map(u => {
                    return (
                        <div key={u.id}>
                            <span>
                                <div>
                                    <img src={u.photoUrl} className={styles.userPhoto}/>
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
                                    <div>{u.fullName}</div>
                                    <div>{u.status}</div>

                                </span>
                                <span>
                                    <div>{u.location.country}</div>
                                    <div>{u.location.city}</div>
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