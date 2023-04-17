import React, {createRef, RefObject} from 'react';
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Messege/Message";
import state from "../../redux/state";

type DialogsPropsType = {
    state: {
        dialogs: Array<DialogType>,
        messages: Array<MessageType>
    }
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

    const newMessage:RefObject<HTMLTextAreaElement> = createRef()

    const addNewMessage=()=>{
        const title = newMessage.current?.value || ""
        alert(title)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
            </div>
            <div className={s.buttonAndInput}>
                <textarea ref={newMessage}></textarea>
                <button onClick={addNewMessage}>Add message</button>

            </div>
        </div>
    )
}
export default Dialogs