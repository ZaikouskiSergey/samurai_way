import axios from "axios";
import {UserType} from "../redux/users-reducer";

type UserResponseType = {
    items: UserType[]
    totalCount: number
    error: string | null
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
    }
}
