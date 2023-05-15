import React, {ChangeEvent } from 'react';
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Messege/Message";



type DialogsPropsType = {
    updateNewMessageBody: (body: string) => void
    sendMessage: () => void
    state: {
        dialogs: Array<DialogType>,
        messages: Array<MessageType>,
        newMessageBody: string
    }
    /*store: StoreType*/
    /* state: {
         dialogs: Array<DialogType>,
         messages: Array<MessageType>,
         newMessageBody: string
     },
     dispatch: (action: any) => void*/
}
type DialogType = {
    name: string,
    id: string | number
}
type MessageType = {
    message: string,
    id?: number
}

const Dialogs = (props: DialogsPropsType) => {
    let state = props.state;

    let dialogsElements = state.dialogs.map(dialog => (
        <DialogItem name={dialog.name} id={dialog.id}/>))

    let messagesElements = state.messages.map(message => (
        <Message message={message.message}/>
    ))

    let newMessageBody = state.newMessageBody

    const onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let body = e.currentTarget.value
        props.updateNewMessageBody(body)

    }
    const addNewMessage = () => {
        props.sendMessage()
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <div>
                    <textarea
                        placeholder={'Enter your message'}
                        value={newMessageBody}
                        onChange={onNewMessageChange}
                    ></textarea>
                </div>
                <div>
                    <button onClick={addNewMessage}>send message</button>
                </div>
            </div>

        </div>
    )
}
export default Dialogs