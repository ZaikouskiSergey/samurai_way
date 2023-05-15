import React from "react";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {StoreType} from "../../../redux/store";
import StoreContext from "../../../StoreContext";


type MyContainerPostsPropsType = {
    store: StoreType
    /* posts: Array<PostsType>
     newPostText: string
     dispatch: (action: any) => void*/
}
type PostsType = {
    id?: number,
    message: string,
    likesCount: number

}

const MyPostsContainer = () => {
    return (
        <StoreContext.Consumer>
            {(store) => {
                let state = store.getState();
                const addPost = () => {
                    store.dispatch(addPostActionCreator())
                }
                const onChangePost = (text: string) => {
                    let action = {type: "UPDATE-NEW-POST-TEXT", newText: text};
                    store.dispatch(updateNewPostTextActionCreator(text))
                }
               return (
                   <MyPosts
                    updateNewPostText={onChangePost}
                    addPost={addPost}
                    posts={state.profilePage.posts}
                    newPostText={state.profilePage.newPostText}

                />)}
        }
        </StoreContext.Consumer>)
}
export default MyPostsContainer;