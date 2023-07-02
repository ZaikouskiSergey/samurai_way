import React from "react";
import s from './Header.module.css';
import {NavLink} from "react-router-dom";

class HeaderContainer extends React.Component {
    render(){
        return (
            <header className={s.header}>
                <img alt={'picture'} src='https://s3-eu-west-1.amazonaws.com/tpd/logos/5be01d787b5e5b0001ebb6bb/0x0.png'/>
                <div className={s.loginBlock}>
                    <NavLink to={'/login'}>Login</NavLink>
                </div>
            </header>
        )

    }
}
export default HeaderContainer;