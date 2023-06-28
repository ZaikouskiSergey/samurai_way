import {combineReducers, createStore} from "redux";
import {profileReducer} from "./profile-reducer";
import {dialogsReducer} from "./dialogs-reducer";
import {DialogType, MessageType, PostsType} from "./store";
import {usersReducer} from "./users-reducer";
import {ProfileAPIProps} from "../components/Profile/ProfileContainer";

export type stateType = {
    profilePage: {
        posts: Array<PostsType>
        newPostText: string
        profile: ProfileAPIProps | null
    },
    dialogsPage: {
        dialogs: Array<DialogType>,
        messages: Array<MessageType>,
        newMessageBody: string
    }
}

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer
})
let store = createStore(reducers);

//window.store = store;

export default store;