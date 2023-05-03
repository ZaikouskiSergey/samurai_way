import React, {ChangeEvent, createRef, RefObject, TextareaHTMLAttributes} from 'react';
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Messege/Message";
import state, {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/state";

type DialogsPropsType = {
    state: {
        dialogs: Array<DialogType>,
        messages: Array<MessageType>,
        newMessageBody: string
    },
    dispatch: (action: any) => void
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

    let dialogsElements = props.state.dialogs.map(dialog => (
        <DialogItem name={dialog.name} id={dialog.id}/>))

    let messagesElements = props.state.messages.map(message => (
        <Message message={message.message}/>
    ))

    let newMessageBody = props.state.newMessageBody

    const onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let body = e.currentTarget.value
        props.dispatch(updateNewMessageBodyCreator(body))
    }

    const addNewMessage = () => {
        props.dispatch(sendMessageCreator())
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