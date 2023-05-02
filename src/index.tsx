import React from 'react';
import './index.css';
import store, {stateType,} from "./redux/state";
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

let rerenderEntireTree = (state:stateType)=>{
    ReactDOM.render(
        <App
            state={state} dispatch={store.dispatch.bind(store)}
        />,
        document.getElementById('root')
    );

}

rerenderEntireTree(store.getState());

store.subscribe(rerenderEntireTree);