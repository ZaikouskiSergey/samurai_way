import {Dispatch} from "redux";
import {AuthAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const initialState = {
    id: null,
    login: null,
    email: null,
    isAuth: false
}
export const authReducer = (state: InitialStateAuthType = initialState, action: ActionsUsersType) => {
    switch (action.type) {
        case "SET-USER-DATA":
            return {...state, ...action.payload}
        default:
            return state
    }
}
//actions
export const setAuthUserData = (id: number| null, login: string| null, email: string|null, isAuth: boolean) => {
    return {type: "SET-USER-DATA", payload: {id, email, login, isAuth}} as const
}
//thunks
export const getAuthUserData = () => (dispatch: Dispatch) => {
    return AuthAPI.me().then(response => {
        if (response.data.resultCode === 0) {
            let {id, login, email} = response.data.data
            dispatch(setAuthUserData(id, login, email, true))
        }
    })
}
export const loginTC = (email: string, password: string, rememberMe: boolean) => {
    return (dispatch: Dispatch) => {
        AuthAPI.login(email, password, rememberMe)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch<any>(getAuthUserData())
                } else {
                    let message  =  response.data.messages.length > 0 ? response.data.messages[0] : "some error"
                    dispatch(stopSubmit("login", {_error: message}))
                }
            })
    };
}
export const logOutTC = () => (dispatch: Dispatch) => {
    AuthAPI.logOut()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false))
            }
        })
}

//types
export type InitialStateAuthType = {
    id: null | number
    login: null | string
    email: null | string
    isAuth: boolean
}
export type ActionsUsersType = SetAuthUserData
export type SetAuthUserData = ReturnType<typeof setAuthUserData>

