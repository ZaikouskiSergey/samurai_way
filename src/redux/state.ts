let rerenderEntireTree = (state:stateType) => {
    console.log('State changed')
}

export type stateType = {
    profilePage: {
        posts: Array<PostsType>
        newPostText: string
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
        newPostText: 'it-kamasutra.com'
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

export const addPost = () => {
    let newPost: PostsType = {
        id: 5,
        message: state.profilePage.newPostText,
        likesCount: 0
    }
    state.profilePage.posts.push(newPost)
    state.profilePage.newPostText = ""
    rerenderEntireTree(state);
}
export const updateNewPostText = (newText: string) => {
    state.profilePage.newPostText = newText
    rerenderEntireTree(state);

}

export const subscribe = (observer:any) => {
    rerenderEntireTree = observer
}

export default state;