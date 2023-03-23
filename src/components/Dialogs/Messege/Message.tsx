import React from 'react';
import s from './../Dialogs.module.css'
import {NavLink} from "react-router-dom";

type MessagePropsType = {
    message: string
}
const Message = (props: MessagePropsType) => {
    return (
        <div className={s.message}>{props.message}</div>
    )
}

export default Message