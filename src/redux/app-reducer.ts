import {Dispatch} from "redux";
import {getAuthUserData} from "redux/auth-reducer";

const initialState = {
    initialized: false,
    globalError: null
}
export const appReducer = (state: InitialStateAppType = initialState, action: ActionsUsersType) => {
    switch (action.type) {
        case "INITIALIZED-SUCCESS":
            return {...state, initialized: true}
        default:
            return state
    }
}
//actions
export const initializedSuccess = () => ({type: "INITIALIZED-SUCCESS"} as const)
//thunks
export const initializeApp = () => (dispatch: Dispatch) => {
    let promise = dispatch<any>(getAuthUserData())
    promise.then(()=>{
        dispatch(initializedSuccess())
    })
}
//types
export type InitialStateAppType = {
    initialized: boolean
}
export type ActionsUsersType = initializedSuccess
export type initializedSuccess = ReturnType<typeof initializedSuccess>

