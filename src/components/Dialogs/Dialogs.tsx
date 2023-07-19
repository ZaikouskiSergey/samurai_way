import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Messege/Message";
import {Redirect} from "react-router-dom";
import {Field, InjectedFormProps, reduxForm} from "redux-form";

type DialogsPropsType = {
    updateNewMessageBody: (body: string) => void
    sendMessage: () => void
    dialogsPage: {
        dialogs: Array<DialogType>,
        messages: Array<MessageType>,
        newMessageBody: string
    }
    isAuth: boolean
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

    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map(dialog => (
        <DialogItem key={dialog.id} name={dialog.name} id={dialog.id}/>))

    let messagesElements = state.messages.map(message => (
        <Message key={message.id} message={message.message}/>
    ))

    let newMessageBody = state.newMessageBody
    const onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let body = e.currentTarget.value
        props.updateNewMessageBody(body)
    }
    const addNewMessage = (values:AddMessageFormType) => {
        props.sendMessage(values.newMessageBody)

    }



    // debugger
    // if(!props.isAuth) return <Redirect to={"/login"}/>

    return (
        <div className={s.dialogs}>
            <div className={s.dialogItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <AddMessageFormRedux onSubmit={addNewMessage}/>

            </div>
        </div>
    )
}

export type AddMessageFormType = {
    newMessageBody: string
}
const AddMessageForm: React.FC<InjectedFormProps<AddMessageFormType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={'textarea'} name={'newMessageBody'} placeholder={'Enter your message'}/>
            <div>
                <button >send message</button>
            </div>
        </form>
    )
}
const AddMessageFormRedux = reduxForm<AddMessageFormType>({form: "dialogAddMessageForm"})(AddMessageForm)
export default Dialogs