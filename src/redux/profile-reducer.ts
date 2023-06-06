
import {PostsType} from "./store";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";

type ProfileInitialStateType = {
    posts: Array<PostsType>
    newPostText: string
}

const initialState = {
        posts: [
            {id: 1, message: 'Hi, how are you?', likesCount: 15},
            {id: 2, message: "It's my first post", likesCount: 20},
            {id: 3, message: "Blabla", likesCount: 2}
        ],
        newPostText: 'it-kamasutra.com'
    }

export const profileReducer = (state: ProfileInitialStateType = initialState, action: ActionsProfileType) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: 0
            }
            // state.posts.push(newPost)
            // state.newPostText = ""
            return {...state, posts: [...state.posts, newPost], newPostText: ""};
        case UPDATE_NEW_POST_TEXT:
            //state.newPostText = action.newText
            return {...state, newPostText: action.newText};
        default:
            return state
    }
}

export type ActionsProfileType = UpdateNewPostTextActionCreator |AddPostActionCreator
type AddPostActionCreator = ReturnType<typeof addPostActionCreator>

type UpdateNewPostTextActionCreator = ReturnType<typeof updateNewPostTextActionCreator>
export const addPostActionCreator = () => ({type: ADD_POST} as const)
export const updateNewPostTextActionCreator = (text: string) =>
    ({type: UPDATE_NEW_POST_TEXT, newText: text} as const)