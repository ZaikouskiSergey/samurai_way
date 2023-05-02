import React from 'react';
import './index.css';
import store, {stateType, StoreType} from "./redux/state";
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


let rerenderEntireTree = (state:stateType)=>{
    ReactDOM.render(
        <App
            state={state}
            addPost={store.addPost.bind(store)}
            updateNewPostText={store.updateNewPostText.bind(store)}
        />,
        document.getElementById('root')
    );

}

rerenderEntireTree(store.getState());

store.subscribe(rerenderEntireTree);