import {profileReducer} from "./profile-reducer";
import {dialogsReducer} from "./dialogs-reducer";

export type StoreType = {
    _state: stateType
    _callSubscriber: (state: stateType) => void
    getState: () => stateType
    dispatch: (action: any) => void
    subscribe: (observer: any) => void
}
export type stateType = {
    profilePage: {
        posts: Array<PostsType>
        newPostText: string
    },
    dialogsPage: {
        dialogs: Array<DialogType>,
        messages: Array<MessageType>,
        newMessageBody: string
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
let store: StoreType = {
    _state: {
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
            newMessageBody: ""
        },
    },
    _callSubscriber(state: stateType) {
        console.log('State changed');
    },

    getState() {
        return this._state
    },
    subscribe(observer: any) {
        this._callSubscriber = observer
    },

    dispatch(action: any) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._callSubscriber(this._state)
    }
}
export default store;
