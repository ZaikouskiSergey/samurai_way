import React from 'react';
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Messege/Message";

const Dialogs = () => {
    let dialogs = [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Andrey'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Sasha'},
        {id: 5, name: 'Victor'},
        {id: 6, name: 'Valera'},
    ]
    let dialogsElements = dialogs.map(dialog => (
        <DialogItem name={dialog.name} id={dialog.id}/>))

    let messages = [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How is your IT-kamasutra?'},
        {id: 3, message: 'Yo'},
        {id: 4, message: 'Yo'}
    ]

    let messagesElements = messages.map(message => (
        <Message message={message.message}/>
    ))
    return (
        <div className={s.dialogs}>
            <div className={s.dialogItems}>
                {dialogsElements}
            </div>

            <div className={s.messages}>
                {messagesElements}
            </div>
        </div>
    )
}
export default Dialogs