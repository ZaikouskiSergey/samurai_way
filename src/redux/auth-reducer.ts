export type InitialStateAuthType = {
    id: null | number
    login: null | string
    email: null | string
    isAuth: boolean
}

const initialState = {
    id: null,
    login: null,
    email: null,
    isAuth: false
}
export const authReducer = (state: InitialStateAuthType = initialState, action: ActionsUsersType) => {
    switch (action.type) {
        case "SET-USER-DATA":
            return {...state, ...action.data, isAuth:true }
        default:
            return state
    }
}
export type ActionsUsersType = SetAuthUserData
type SetAuthUserData = ReturnType<typeof setAuthUserData>
export const setAuthUserData = (userId: number, email: string, login: string) => {
    return {
        type: "SET-USER-DATA",
        data: {
            userId,
            email,
            login
        }
    } as const
}

