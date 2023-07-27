import React from 'react';
import {sendMessageCreator} from "redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {RootState} from "redux/redux-store";
import {compose, Dispatch} from "redux";
import {WithAuthRedirect} from "hoc/WithAuthRedirect";

let mapStateToProps = (state: RootState) => {
       return {
        dialogsPage: state.dialogsPage
    }
}
let mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        sendMessage: (newMessageBody:string) => {
            dispatch(sendMessageCreator(newMessageBody))
        }
    }
}

//let AuthRedirectComponent = WithAuthRedirect(Dialogs)
//const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);
export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    WithAuthRedirect
)(Dialogs);