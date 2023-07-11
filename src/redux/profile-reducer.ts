import {PostsType} from "./store";
import {ProfileAPIProps} from "../components/Profile/ProfileContainer";
import {Dispatch} from "redux";
import {profileAPI, usersAPI} from "../api/api";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";

const initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 15},
        {id: 2, message: "It's my first post", likesCount: 20},
        {id: 3, message: "Blabla", likesCount: 2}
    ],
    newPostText: 'it-kamasutra.com',
    profile: null,
    status: ''
}
export const profileReducer = (state: ProfileInitialStateType = initialState, action: ActionsProfileType) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: 0
            }
            return {...state, posts: [...state.posts, newPost], newPostText: ""};
        case UPDATE_NEW_POST_TEXT:
            return {...state, newPostText: action.newText};
        case "SET-USER-PROFILE": {
            return {...state, profile: action.profile}
        }
        case "SET-USER-STATUS": {
            return {...state, status: action.status}
        }
        default:
            return state
    }
}

export type ActionsProfileType =
    | UpdateNewPostTextActionCreator
    | AddPostActionCreator
    | SetUserProfile
    | SetUserStatusAC
type AddPostActionCreator = ReturnType<typeof addPostActionCreator>
type UpdateNewPostTextActionCreator = ReturnType<typeof updateNewPostTextActionCreator>
type SetUserProfile = ReturnType<typeof setUserProfile>
type SetUserStatusAC = ReturnType<typeof setUserStatusAC>

//actions
export const addPostActionCreator = () => ({type: ADD_POST} as const)
export const updateNewPostTextActionCreator = (text: string) =>
    ({type: UPDATE_NEW_POST_TEXT, newText: text} as const)
export const setUserProfile = (profile: ProfileAPIProps) =>
    ({type: 'SET-USER-PROFILE', profile} as const)
export const setUserStatusAC = (status: string) => ({type: 'SET-USER-STATUS', status} as const)


//thunks

export const getUserProfile = (userId: number) => (dispatch: Dispatch) => {
    usersAPI.getProfile(userId)
        .then(response => {
            dispatch(setUserProfile(response.data))
        })
}

export const getUserStatus = (userId: number) => (dispatch: Dispatch) => {
    profileAPI.getStatus(userId)
        .then(response => {
            dispatch(setUserStatusAC(response.data))
        })
}
export const updateUserStatus = (status: string) => (dispatch: Dispatch) => {
    profileAPI.updateStatus(status)
        .then(response => {
            if(response.data.resultCode === 0){
            dispatch(setUserStatusAC(status))}
        })
}
// types
type ProfileInitialStateType = {
    posts: Array<PostsType>
    newPostText: string
    profile: ProfileAPIProps | null
    status: string
}


