import React from 'react';
import './index.css';

import state, {subscribe} from "./redux/state";
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {addPost, stateType, updateNewPostText} from "./redux/state";

let rerenderEntireTree = (state:stateType)=>{
    ReactDOM.render(
        <App state={state} addPost={addPost} updateNewPostText={updateNewPostText}/>,
        document.getElementById('root')
    );

}

rerenderEntireTree(state);

subscribe(rerenderEntireTree);