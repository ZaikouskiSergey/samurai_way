import React from "react";
import {addPostActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {stateType} from "../../../redux/store";

let mapStateToProps = (state:stateType) => {
    return {
        posts: state.profilePage.posts
    }
}
let mapDispatchToProps = (dispatch:any) => {
    return {
        addPost: (newPostText: string)=>{
            dispatch(addPostActionCreator(newPostText))
        }
    }
}
const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);
export default MyPostsContainer;