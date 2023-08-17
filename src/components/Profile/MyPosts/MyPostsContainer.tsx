import {addPostActionCreator} from "redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {stateType} from "redux/redux-store";
import {Dispatch} from "redux";

let mapStateToProps = (state:stateType) => {
    return {
        posts: state.profilePage.posts
    }
}
let mapDispatchToProps = (dispatch:Dispatch) => {
    return {
        addPost: (newPostText: string)=>{
            dispatch(addPostActionCreator(newPostText))
        }
    }
}
const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);
export default MyPostsContainer;