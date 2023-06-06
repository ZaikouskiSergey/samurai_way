export type InitialStateUsersType = {
    users: UserType[]
}

export type UserType = {
    id: number
    photoUrl: string
    followed: boolean
    fullName: string
    status: string
    location: {
        city: string
        country: string
    }
}

const initialState = {
    users: [   ]
}
export const usersReducer = (state:InitialStateUsersType = initialState, action: ActionsUsersType) => {
    switch (action.type) {
        case "FOLLOW":
            return {...state,
                users: state.users
                    .map(u => u.id === action.userId
                        ? {...u, followed: true}
                        : u)}
        case "UNFOLLOW" :
            return {...state,
                users: state.users
                    .map(u => u.id === action.userId
                        ? {...u, followed: false}
                        : u)}
        case "SET-USERS":
            return {...state, users: [...state.users, ...action.users]}
        default:
            return state
    }
}
export type ActionsUsersType = FollowACType | UnFollowACType | SetUsersAC
type FollowACType = ReturnType<typeof followAC>
type UnFollowACType = ReturnType<typeof unFollowAC>
type SetUsersAC = ReturnType<typeof setUsersAC>

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

export const setUsersAC =(users:UserType[]) => {
    return {
        type: "SET-USERS",
        users
    } as const
}




