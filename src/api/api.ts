import axios from "axios";
import {UserType} from "../redux/users-reducer";
import {ProfileAPIProps} from "../components/Profile/ProfileContainer";

type UserResponseType = {
    items: UserType[]
    totalCount: number
    error: string | null
}
type FollowUserResponseType = {
    resultCode: number
    messages: Array<string>
    data: {}
    fieldsErrors: Array<string>

}

const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {
        "API-KEY": "8367578b-61db-4643-ae1c-c73f2e728d1b"
    }
})
export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10) {
        return instance.get<UserResponseType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },
    follow(userId:number){
        return instance.post<FollowUserResponseType>(`follow/${userId}`)
    },
    unfollow(userId:number){
        return instance.delete<FollowUserResponseType>(`follow/${userId}`)
    },
    getProfile(userId:number){
        console.warn('Obsolete method. Please use profileAPI object')
        return profileAPI.getProfile(userId)
    }
}

export const profileAPI = {
    getProfile(userId:number){
        return instance.get<ProfileAPIProps>(`profile/${userId}`)
    },
    getStatus(userId:number){
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(newStatus:string){
        return instance.put(`profile/status`, {status: newStatus})
    }
}
export const AuthAPI={
    me(){
        return instance.get<AuthResponseType>(`auth/me`)},
    login(email:string, password:string, rememberMe: boolean){
        return instance.post(`auth/login`, {email, password,rememberMe})
    },
    logOut(){
        return instance.delete(`auth/login`)
    }
}

export type AuthResponseType = {
    data: {
        id: number | null
        login: string
        email: string

    }
    resultCode: number
    messages: string | Array<string>
    fieldsErrors: string | Array<string>
}