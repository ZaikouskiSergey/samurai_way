import {DialogType, MessageType} from "redux/profile-reducer";


const initialState = {
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
    ]
}
export const dialogsReducer = (state: DialogInitialStateType = initialState, action:ActionsDialogsType): DialogInitialStateType => {
    switch (action.type) {
        case "dialogsReducer/SEND-MESSAGE":
            return {...state,
                messages: [...state.messages, {id: 5, message: action.newMessageBody}]};
        default:
            return state
    }
}
//actions
export const sendMessageCreator = (newMessageBody:string) => ({type: "dialogsReducer/SEND-MESSAGE", newMessageBody} as const)

//types
export type DialogInitialStateType = {
    dialogs: Array<DialogType>,
    messages: Array<MessageType>
}
export type ActionsDialogsType = SendMessageCreatorType
type SendMessageCreatorType = ReturnType<typeof sendMessageCreator>
