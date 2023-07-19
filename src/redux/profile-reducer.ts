import {PostsType} from "./store";
import {ProfileAPIProps} from "../components/Profile/ProfileContainer";
import {Dispatch} from "redux";
import {profileAPI, usersAPI} from "../api/api";


const initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 15},
        {id: 2, message: "It's my first post", likesCount: 20},
        {id: 3, message: "Blabla", likesCount: 2}
    ],
    profile: null,
    status: ''
}
export const profileReducer = (state: ProfileInitialStateType = initialState, action: ActionsProfileType) => {
    switch (action.type) {
        case "ADD-POST":
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            }
            return {...state, posts: [...state.posts, newPost]};
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
    | AddPostActionCreator
    | SetUserProfile
    | SetUserStatusAC

type AddPostActionCreator = ReturnType<typeof addPostActionCreator>
type SetUserProfile = ReturnType<typeof setUserProfile>
type SetUserStatusAC = ReturnType<typeof setUserStatusAC>

//actions
export const addPostActionCreator = (newPostText: string) => ({type: "ADD-POST", newPostText } as const)
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
    profile: ProfileAPIProps | null
    status: string
}


