import React from "react";
import s from './Post.module.css'

const Post = () => {
    return (
        <div className={s.item}>
            <img src='https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg'/>
            post 1
            <div>
                <span>like</span>
            </div>
        </div>
    )
}
export default Post;