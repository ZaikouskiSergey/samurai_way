import {Dispatch} from "redux";
import {AuthAPI, securityAPI} from "api/api";
import {stopSubmit} from "redux-form";

const initialState = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
    captchaUrl: null
}
export const authReducer = (state: InitialStateAuthType = initialState, action: ActionsUsersType) => {
    switch (action.type) {
        case "authReducer/SET-USER-DATA":
            return {...state, ...action.payload}
        case "authReducer/GET-CAPTCHA-URL-SUCCESS": {
            return {...state, ...action.payload}
        }
        default:
            return state
    }
}
//actions
export const setAuthUserData = (id: number | null, login: string | null, email: string | null, isAuth: boolean) => {
    return {type: "authReducer/SET-USER-DATA", payload: {id, email, login, isAuth}} as const
}

export const getCaptchaUrlSuccess = (captchaUrl: string) => {
    return {
        type: "authReducer/GET-CAPTCHA-URL-SUCCESS",
        payload: {
            captchaUrl
        }
    } as const
}
//thunks
export const getAuthUserData = () => async (dispatch: Dispatch) => {
    try {
        const response = await AuthAPI.me()
        if (response.data.resultCode === 0) {
            let {id, login, email} = response.data.data
            dispatch(setAuthUserData(id, login, email, true))
        }
    } catch (e) {
    }
}

export const loginTC = (email: string, password: string, rememberMe: boolean) => {
    return async (dispatch: Dispatch) => {
        const response = await AuthAPI.login(email, password, rememberMe)
        if (response.data.resultCode === 0) {
            dispatch<any>(getAuthUserData())
        } else {
            if (response.data.resultCode === 10) {
                dispatch<any>(getCaptchaUrl())

            }
            let message = response.data.messages.length > 0 ? response.data.messages[0] : "some error"
            dispatch(stopSubmit("login", {_error: message}))
        }
    };
}

export const getCaptchaUrl = () => async (dispatch: Dispatch) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}
export const logOutTC = () => async (dispatch: Dispatch) => {
    const response = await AuthAPI.logOut()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

//types
export type InitialStateAuthType = {
    id: null | number
    login: null | string
    email: null | string
    isAuth: boolean
    captchaUrl: null | string
}
export type ActionsUsersType = SetAuthUserData | GetCaptchaUrlSuccess
export type SetAuthUserData = ReturnType<typeof setAuthUserData>
export type GetCaptchaUrlSuccess = ReturnType<typeof getCaptchaUrlSuccess>

