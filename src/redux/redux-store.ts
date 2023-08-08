import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import {DialogType, MessageType, PostsType, profileReducer} from "./profile-reducer";
import {dialogsReducer} from "./dialogs-reducer";
import {usersReducer} from "./users-reducer";
import {ProfileAPIProps} from "components/Profile/ProfileContainer";
import {authReducer} from "./auth-reducer";
import thunk, {ThunkDispatch} from "redux-thunk";
import {reducer as formReducer} from "redux-form";
import {useDispatch} from "react-redux";
import {appReducer} from "redux/app-reducer";


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
    form: formReducer,
    app : appReducer
})
let store = createStore(reducers, applyMiddleware(thunk))
export type RootState = ReturnType<typeof reducers>
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
//window.store = store;
export default store;