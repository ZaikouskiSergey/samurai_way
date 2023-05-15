import {combineReducers, createStore} from "redux";
import {profileReducer} from "./profile-reducer";
import {dialogsReducer} from "./dialogs-reducer";
import {DialogType, MessageType, PostsType} from "./store";

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

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer
})
let store = createStore(reducers);

export default store;