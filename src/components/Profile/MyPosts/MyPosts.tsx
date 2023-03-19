import React from "react";
import s from './MyPosts.module.css'
import Post from "./Post/Post";

const MyPosts = () => {
    return (
        <div>
            My posts
            <div>
                <textarea></textarea>
                <button>Add post</button>
                <button>Remove</button>
            </div>
            <Post count={15} message='Hi, how are you?' />
            <Post message="It's my first post" count={20}/>


        </div>
    )
}
export default MyPosts;