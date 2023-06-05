import React from "react";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {stateType} from "../../../redux/store";



/*type MyContainerPostsPropsType = {
    store: StoreType
    /!* posts: Array<PostsType>
     newPostText: string
     dispatch: (action: any) => void*!/
}
type PostsType = {
    id?: number,
    message: string,
    likesCount: number

}*/

let mapStateToProps = (state:stateType) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}
let mapDispatchToProps = (dispatch:any) => {
    return {
        updateNewPostText: (text: string)=>{
           //let action = {type: "UPDATE-NEW-POST-TEXT", newText: text};
            dispatch(updateNewPostTextActionCreator(text))
        },
        addPost: ()=>{
            dispatch(addPostActionCreator())
        }
    }
}
const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);
export default MyPostsContainer;