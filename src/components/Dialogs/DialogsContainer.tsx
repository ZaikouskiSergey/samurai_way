import React, {ChangeEvent, createRef, RefObject, TextareaHTMLAttributes} from 'react';
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Messege/Message";
import {StoreType} from "../../redux/store";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";


type DialogsContainerPropsType = {
    store:  StoreType
}

const DialogsContainer = (props: DialogsContainerPropsType) => {
    let state = props.store.getState().dialogsPage;
    const onNewMessageChange = (body:string) => {
        props.store.dispatch(updateNewMessageBodyCreator(body))
    }
    const addNewMessage = () => {
        props.store.dispatch(sendMessageCreator())
    }
    return (
     <Dialogs
         updateNewMessageBody={onNewMessageChange}
         sendMessage = {addNewMessage}
         state={state}
     />
    )
}
export default DialogsContainer