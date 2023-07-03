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
            return {
                ...state,
                ...action.payload,
                isAuth: true
            }
        default:
            return state
    }
}
export type ActionsUsersType = SetAuthUserData
type SetAuthUserData = ReturnType<typeof setAuthUserData>
export const setAuthUserData = (id: number, login: string, email: string) => {
    return {
        type: "SET-USER-DATA",
        payload: {
            id,
            email,
            login
        }
    } as const
}

