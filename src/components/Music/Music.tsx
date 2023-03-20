import React from "react";
import s from "./Music.module.css"
const Music = () =>{
    return (
        <div className={s.music}>
            Music
            <ul>My playlist
                <li>1</li>
                <li>2</li>
                <li>3</li>
            </ul>
        </div>
    )
}
export default Music