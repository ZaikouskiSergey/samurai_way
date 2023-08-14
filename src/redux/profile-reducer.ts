
import {ProfileAPIProps} from "components/Profile/ProfileContainer";
import {Dispatch} from "redux";
import {profileAPI, usersAPI} from "api/api";
import {AppThunkDispatch, RootState} from "redux/redux-store";

const initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 15},
        {id: 2, message: "It's my first post", likesCount: 20},
        {id: 3, message: "Blabla", likesCount: 2}
    ],
    profile: {
        aboutMe:'',
        userId: 0,
        lookingForAJob: true,
        lookingForAJobDescription: 'lookingForAJobDescription',
        fullName: '',
        contacts: {
            github: 'github',
            vk: 'vk',
            facebook: 'facebook',
            instagram: 'instagram',
            twitter: 'twitter',
            website: 'website',
            youtube: 'youtube',
            mainLink: ''
        },
        photos: {
            small: '',
            large: '',
        }
    },
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
        dispatch(savePhotoSuccessAC(response.data.data.photos))
    }
}
export const saveProfile = (profile: ProfileAPIProps) => async (dispatch: AppThunkDispatch, getState:() => RootState) => {
    const userId = getState().auth.id
    const response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === 0) {
        console.log(response)
        if(userId){
            dispatch<any>(getUserProfile(userId))
        }
    }
}
// types
type ProfileInitialStateType = {
    posts: Array<PostsType>
    profile: ProfileAPIProps
    status: string
}

export type StoreType = {
    _state: stateType
    _callSubscriber: (state: stateType) => void
    getState: () => stateType
    dispatch: (action: any) => void
    subscribe: (observer: any) => void
}
export type stateType = {
    profilePage: {
        posts: Array<PostsType>
        profile: ProfileAPIProps | null
        status: string
    },
    dialogsPage: {
        dialogs: Array<DialogType>,
        messages: Array<MessageType>
    }
}
export type MessageType = {
    message: string,
    id?: number
}
export type DialogType = {
    name: string,
    id: string | number
}
export type PostsType = {
    id?: number,
    message: string,
    likesCount: number
}


