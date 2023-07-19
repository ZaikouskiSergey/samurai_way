import React, {ComponentType} from 'react';
import {Redirect} from "react-router-dom";
import {RootState} from "../redux/redux-store";
import {connect} from "react-redux";

type MapStateToPropsForRedirectType = {
    isAuth: boolean
}
const mapStateToPropsForRedirect = (state: RootState): MapStateToPropsForRedirectType => ({
    isAuth: state.auth.isAuth
})

export function WithAuthRedirect<T>(Component: ComponentType<T>) {
    debugger
    function RedirectComponent(props: MapStateToPropsForRedirectType) {

        let {isAuth, ...restProps} = props
        if (!isAuth) return <Redirect to={"/login"}/>

        return <Component {...restProps as T}/>
    }

    // let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)

    return connect(mapStateToPropsForRedirect)(RedirectComponent)

}

