import {PostsType} from "./store";
import {ProfileAPIProps} from "components/Profile/ProfileContainer";
import {Dispatch} from "redux";
import {profileAPI, usersAPI} from "api/api";

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
        case "profileReducer/ADD-POST":
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            }
            return {...state, posts: [...state.posts, newPost]};
        case "profileReducer/SET-USER-PROFILE": {
            return {...state, profile: action.profile}
        }
        case "profileReducer/SET-USER-STATUS": {
            return {...state, status: action.status}
        }
        case "profileReducer/DELETE-POST": {
            return {...state, posts: state.posts.filter(p => p.id !== action.userId)}
        }
        case "profileReducer/SAVE-PHOTO-SUCCESS":{
            return {...state, profile: {...state.profile, photos: action.photos}}
        }
        default:
            return state
    }
}

export type ActionsProfileType =
    | ReturnType<typeof addPostActionCreator>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setUserStatusAC>
    | ReturnType<typeof deletePostAC>
    | ReturnType<typeof savePhotoSuccessAC>

//actions
export const addPostActionCreator = (newPostText: string) => ({type: "profileReducer/ADD-POST", newPostText} as const)
export const deletePostAC = (userId: number) => ({type: "profileReducer/DELETE-POST", userId} as const)
export const setUserProfile = (profile: ProfileAPIProps) =>
    ({type: 'profileReducer/SET-USER-PROFILE', profile} as const)
export const setUserStatusAC = (status: string) => ({type: 'profileReducer/SET-USER-STATUS', status} as const)
export const savePhotoSuccessAC = (photos: any) => ({type: 'profileReducer/SAVE-PHOTO-SUCCESS', photos} as const)

//thunks
export const getUserProfile = (userId: number) => async (dispatch: Dispatch) => {
    const response = await usersAPI.getProfile(userId)
    dispatch(setUserProfile(response.data))
}
export const getUserStatus = (userId: number) => async (dispatch: Dispatch) => {
    const response = await profileAPI.getStatus(userId)
    dispatch(setUserStatusAC(response.data))
}
export const updateUserStatus = (status: string) => async (dispatch: Dispatch) => {
    const response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setUserStatusAC(status))
    }
}
export const savePhoto = (file: any) => async (dispatch: Dispatch) => {
    let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccessAC(response.data.photos))
    }
}
// types
type ProfileInitialStateType = {
    posts: Array<PostsType>
    profile: ProfileAPIProps | null
    status: string
}


