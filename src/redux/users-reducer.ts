import {Dispatch} from "redux";
import {usersAPI} from "api/api";
import {updateObjectInArray} from "utils/object-helpers";

const initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [2, 3, 4, 5]
}
export const usersReducer = (state: InitialStateUsersType = initialState, action: ActionsUsersType) => {
    switch (action.type) {
        case "usersReducer/FOLLOW":
            return {
                ...state, users: updateObjectInArray(state.users, action.userId, "id", {followed:true})
            }
        case "usersReducer/UNFOLLOW" :
            return {
                ...state, users: updateObjectInArray(state.users, action.userId, "id", {followed:false})
            }
        case "usersReducer/SET-USERS":
            return {...state, users: action.users}
        case "usersReducer/SET-CURRENT-PAGE":
            return {...state, currentPage: action.currentPage}
        case "usersReducer/SET-TOTAL-USERS-COUNT":
            return {...state, totalUsersCount: action.totalCount}
        case "usersReducer/TOGGLE-IS-FETCHING":
            return {...state, isFetching: action.isFetching}
        case "usersReducer/TOGGLE-IS-FOLLOWING-PROGRESS":
            return {
                ...state, followingInProgress: action.followingInProgress
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state
    }
}

// actions
export const followSuccess = (userId: number) => ({type: "usersReducer/FOLLOW", userId} as const)
export const unFollowSuccess = (userId: number) => ({type: "usersReducer/UNFOLLOW", userId} as const)
export const setUsers = (users: UserType[]) => ({type: "usersReducer/SET-USERS", users} as const)
export const setCurrentPage = (currentPage: number) => ({type: "usersReducer/SET-CURRENT-PAGE", currentPage} as const)
export const setTotalUsersCount = (totalCount: number) => ({
    type: "usersReducer/SET-TOTAL-USERS-COUNT",
    totalCount
} as const)
export const toggleIsFetching = (isFetching: boolean) => ({
    type: "usersReducer/TOGGLE-IS-FETCHING",
    isFetching
} as const)
export const toggleFollowingProgress = (followingInProgress: boolean, userId: number) =>
    ({type: "usersReducer/TOGGLE-IS-FOLLOWING-PROGRESS", followingInProgress, userId} as const)

// thunks
export const getUsersTC = (currentPage: number, pageSize: number) => {
    return async (dispatch: Dispatch) => {
        dispatch(toggleIsFetching(true))
        dispatch(setCurrentPage(currentPage))
        const data = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(toggleIsFetching(false))
        dispatch(setUsers(data.items))
        dispatch(setTotalUsersCount(data.totalCount))
    }
}
const followUnfollowFlow = async (dispatch: Dispatch, userId: number, apiMethod: any, ActionCreator:any) => {
    dispatch(toggleFollowingProgress(true, userId))
    const response = await apiMethod(userId)
    if (response.data.resultCode === 0) {
        dispatch(ActionCreator(userId))
    }
    dispatch(toggleFollowingProgress(false, userId))
}
export const followTC = (userId: number) => {
    return async (dispatch: Dispatch) => {
        await followUnfollowFlow(dispatch, userId,usersAPI.follow.bind(usersAPI), followSuccess)
    }
}
export const unFollowTC = (userId: number) => {
    return async(dispatch: Dispatch) => {
        await followUnfollowFlow(dispatch, userId,usersAPI.unfollow.bind(usersAPI), unFollowSuccess)
    }
}

// types
export type ActionsUsersType =
    | ReturnType<typeof followSuccess>
    | ReturnType<typeof unFollowSuccess>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalUsersCount>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof toggleFollowingProgress>

export type InitialStateUsersType = {
    users: UserType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
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


