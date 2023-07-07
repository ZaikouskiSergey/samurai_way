import {Dispatch} from "redux";
import {AuthAPI} from "../api/api";

const initialState = {
    id: null,
    login: null,
    email: null,
    isAuth: false
}
export const authReducer = (state: InitialStateAuthType = initialState, action: ActionsUsersType) => {
    switch (action.type) {
        case "SET-USER-DATA":
            return {...state, ...action.payload, isAuth: true}
        default:
            return state
    }
}
//actions
export const setAuthUserData = (id: number, login: string, email: string) => {
    return {type: "SET-USER-DATA", payload: {id, email, login}} as const
}
//thunks
export const getAuthUserData = () => (dispatch: Dispatch) => {
    AuthAPI.me().then(response => {
            if (response.data.resultCode === 0) {
                let {id, login, email} = response.data.data
                dispatch(setAuthUserData(id, login, email))
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

