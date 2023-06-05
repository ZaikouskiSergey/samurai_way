import React from 'react';
import {DialogType, MessageType} from "./store";

const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY";
const SEND_MESSAGE = "SEND-MESSAGE";

export type DialogInitialStateType = {
    dialogs: Array<DialogType>,
    messages: Array<MessageType>,
    newMessageBody: string
}

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
    ],
    newMessageBody: ""
}

export const dialogsReducer = (state: DialogInitialStateType = initialState, action:UpdateNewMessageBodyCreatorType): DialogInitialStateType => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            state.newMessageBody = action.payload.body
            return state;
        case SEND_MESSAGE:
            let body = state.newMessageBody
            state.newMessageBody = '';
            state.messages.push({id: 5, message: body})
            return state;
        default:
            return state
    }
}
export type ActionsDialogsType = SendMessageCreatorType | UpdateNewMessageBodyCreatorType
type SendMessageCreatorType = ReturnType<typeof sendMessageCreator>
type UpdateNewMessageBodyCreatorType = ReturnType<typeof updateNewMessageBodyCreator>


export const sendMessageCreator = () => ({type: SEND_MESSAGE})
export const updateNewMessageBodyCreator = (body: string) => {
    return {
        type: UPDATE_NEW_MESSAGE_BODY,
        payload:{body}
    }
}
