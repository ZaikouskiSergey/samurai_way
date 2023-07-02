export type InitialStateUsersType = {
    id: null | number
    login: null | string
    email: null | string
}

const initialState = {
    id: null,
    login: null,
    email: null,
}
export const authReducer = (state: InitialStateUsersType = initialState, action: ActionsUsersType) => {
    switch (action.type) {
        case "SET-USER-DATA":
            return {...state, ...action.data}
        default:
            return state
    }
}
export type ActionsUsersType = setUserDataType
type setUserDataType = ReturnType<typeof setUserData>
export const setUserData = (userId: number, email: string, login: string) => {
    return {
        type: "SET-USER-DATA",
        data: {
            userId,
            email,
            login
        }
    } as const
}

