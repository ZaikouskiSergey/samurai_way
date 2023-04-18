import { rerenderEntireTree } from "../render"

export type stateType = {
    profilePage: {
        posts: Array<PostsType>
    },
    dialogsPage: {
        dialogs: Array<DialogType>,
        messages: Array<MessageType>
    }
}
export type MessageType = {
    message: string,
    id?: number
}
export type DialogType = {
    name: string,
    id: string | number
}
export type PostsType = {
    id?: number,
    message: string,
    likesCount: number
}

let state: stateType = {
    profilePage: {
        posts: [
            {id: 1, message: 'Hi, how are you?', likesCount: 15},
            {id: 2, message: "It's my first post", likesCount: 20},
            {id: 3, message: "Blabla", likesCount: 2}
        ],
    },
    dialogsPage: {
        messages: [
            {id: 1, message: 'Hi'},
            {id: 2, message: 'How is your IT-kamasutra?'},
            {id: 3, message: 'Yo'},
            {id: 4, message: 'Yo'}
        ],
        dialogs: [
            {id: 1, name: 'Dimych'},
            {id: 2, name: 'Andrey'},
            {id: 3, name: 'Sveta'},
            {id: 4, name: 'Sasha'},
            {id: 5, name: 'Victor'},
            {id: 6, name: 'Valera'},
        ],
    },
}

export const addPost = (postMessage: string) => {
    let newPost:PostsType = {
        id: 5,
        message: postMessage,
        likesCount: 0
    }
    state.profilePage.posts.push(newPost)
    rerenderEntireTree(state);
}

export default state;