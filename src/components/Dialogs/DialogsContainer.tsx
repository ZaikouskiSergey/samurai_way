import React from 'react';

import {StoreType} from "../../redux/store";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import StoreContext from "../../StoreContext";


type DialogsContainerPropsType = {
    store: StoreType
}

const DialogsContainer = () => {
    return (
        <StoreContext.Consumer>
            {(store) => {
                let state = store.getState().dialogsPage;
                const onNewMessageChange = (body: string) => {
                    store.dispatch(updateNewMessageBodyCreator(body))
                }
                const addNewMessage = () => {
                    store.dispatch(sendMessageCreator())
                }
                return (
                    <Dialogs
                        updateNewMessageBody={onNewMessageChange}
                        sendMessage={addNewMessage}
                        state={state}
                    />)
            }
        }
        </StoreContext.Consumer>
    )
}
export default DialogsContainer