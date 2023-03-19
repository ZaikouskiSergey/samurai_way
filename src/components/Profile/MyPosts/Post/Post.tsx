import React from "react";
import s from './Post.module.css'

type PostPropsType = {
    message: string,
    count: number
}
const Post = (props: PostPropsType) => {
    return (
        <div className={s.item}>
            <img src='https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg'/>
            {props.message}
            <div>
                <span>like</span> {props.count}
            </div>
        </div>
    )
}
export default Post;