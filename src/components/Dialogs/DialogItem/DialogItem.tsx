import React from 'react';
import s from './../Dialogs.module.css'
import {NavLink} from "react-router-dom";

type DialogItemPropsType = {
    name: string,
    id: string | number
}
const DialogItem = (props: DialogItemPropsType) => {
    return (
        <div className={`${s.dialog} ${s.active}`}>
            <img src='https://i.pinimg.com/736x/f5/27/41/f52741fb62bf1d821948a49204406bdc.jpg'/>
            <NavLink to={`/dialogs/${props.id}`}>{props.name}</NavLink>
        </div>
    )
}
export default DialogItem