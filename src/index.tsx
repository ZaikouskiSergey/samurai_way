import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

let posts = [
    {id: 1, message: 'Hi, how are you?', likesCount: 15},
    {id: 2, message: "It's my first post", likesCount: 20},
    {id: 3, message: "Blabla", likesCount: 2}
];
let dialogs = [
    {id: 1, name: 'Dimych'},
    {id: 2, name: 'Andrey'},
    {id: 3, name: 'Sveta'},
    {id: 4, name: 'Sasha'},
    {id: 5, name: 'Victor'},
    {id: 6, name: 'Valera'},
];
let messages = [
    {id: 1, message: 'Hi'},
    {id: 2, message: 'How is your IT-kamasutra?'},
    {id: 3, message: 'Yo'},
    {id: 4, message: 'Yo'}
]

ReactDOM.render(
    <App posts={posts} dialogs={dialogs} messages={messages}/>,
    document.getElementById('root')
);
