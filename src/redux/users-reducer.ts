export type InitialStateUsersType = {
    users: UserType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
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
    currentPage: 1,
    isFetching: true
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
        case "TOGGLE-IS-FETCHING": {
            return {...state, isFetching: action.isFetching}
        }
        default:
            return state
    }
}
export type ActionsUsersType =
    FollowACType
    | UnFollowACType
    | SetUsersAC
    | SetCurrentPageAC
    | SetTotalUsersCountAC
    | toggleIsFetchingAC

type FollowACType = ReturnType<typeof follow>
type UnFollowACType = ReturnType<typeof unFollow>
type SetUsersAC = ReturnType<typeof setUsers>
type SetCurrentPageAC = ReturnType<typeof setCurrentPage>
type SetTotalUsersCountAC = ReturnType<typeof setTotalUsersCount>
type toggleIsFetchingAC = ReturnType<typeof toggleIsFetching>

export const follow = (userId: number) => {
    return {
        type: "FOLLOW",
        userId
    } as const
}
export const unFollow = (userId: number) => {
    return {
        type: "UNFOLLOW",
        userId
    } as const
}

export const setUsers = (users: UserType[]) => {
    return {
        type: "SET-USERS",
        users
    } as const
}

export const setCurrentPage = (currentPage: number) => {
    return {
        type: 'SET-CURRENT-PAGE',
        currentPage
    } as const
}
export const setTotalUsersCount = (totalCount: number) => {
    return {
        type: 'SET-TOTAL-USERS-COUNT',
        totalCount
    } as const

}
export const toggleIsFetching = (isFetching: boolean) => {
    return {
        type: 'TOGGLE-IS-FETCHING',
        isFetching

    } as const
}




