import {applyMiddleware, combineReducers, createStore} from "redux";
import {profileReducer} from "./profile-reducer";
import {dialogsReducer} from "./dialogs-reducer";
import {DialogType, MessageType, PostsType} from "./store";
import {usersReducer} from "./users-reducer";
import {ProfileAPIProps} from "../components/Profile/ProfileContainer";
import {authReducer} from "./auth-reducer";
import thunk from "redux-thunk";
import {reducer as formReducer} from "redux-form";

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
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer
})
let store = createStore(reducers, applyMiddleware(thunk));
export type RootState = ReturnType<typeof reducers>

//window.store = store;

export default store;