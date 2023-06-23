export type InitialStateUsersType = {
    users: UserType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
}

export type UserType = {
    name: string
    id: number
    photos: {
        small: null | string
        large: null | string
    }
    status: null | string
    followed: boolean
}


const initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1
}
export const usersReducer = (state: InitialStateUsersType = initialState, action: ActionsUsersType) => {
    switch (action.type) {
        case "FOLLOW":
            return {
                ...state,
                users: state.users
                    .map(u => u.id === action.userId
                        ? {...u, followed: true}
                        : u)
            }
        case "UNFOLLOW" :
            return {
                ...state,
                users: state.users
                    .map(u => u.id === action.userId
                        ? {...u, followed: false}
                        : u)
            }
        case "SET-USERS":
            return {...state, users: action.users}
        case "SET-CURRENT-PAGE":
            return {...state, currentPage: action.currentPage}
        case "SET-TOTAL-USERS-COUNT":
            return {...state, totalUsersCount: action.totalCount}
        default:
            return state
    }
}
export type ActionsUsersType = FollowACType | UnFollowACType | SetUsersAC | SetCurrentPageAC |SetTotalUsersCountAC
type FollowACType = ReturnType<typeof followAC>
type UnFollowACType = ReturnType<typeof unFollowAC>
type SetUsersAC = ReturnType<typeof setUsersAC>
type SetCurrentPageAC = ReturnType<typeof setCurrentPageAC>
type SetTotalUsersCountAC = ReturnType<typeof setTotalUsersCountAC>

export const followAC = (userId: number) => {
    return {
        type: "FOLLOW",
        userId
    } as const
}
export const unFollowAC = (userId: number) => {
    return {
        type: "UNFOLLOW",
        userId
    } as const
}

export const setUsersAC = (users: UserType[]) => {
    return {
        type: "SET-USERS",
        users
    } as const
}

export const setCurrentPageAC = (currentPage:number)=>{
    return {
        type: 'SET-CURRENT-PAGE',
        currentPage
    } as const
}
export const setTotalUsersCountAC = (totalCount:number)=>{
    return {
        type: 'SET-TOTAL-USERS-COUNT',
        totalCount
    } as const

}




