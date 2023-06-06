import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";

import DialogsContainer from "./components/Dialogs/DialogsContainer";


// type AppPropsType = {
//     state: {
//         profilePage: {
//             posts: Array<PostsType>
//             newPostText: string
//         },
//         dialogsPage: {
//             dialogs: Array<DialogType>,
//             messages: Array<MessageType>,
//             newMessageBody: string
//         }
//     },
//     dispatch: (action: any) => void
//     store: any
// }
/*type MessageType = {
    message: string,
    id?: number
}
type DialogType = {
    name: string,
    id: string | number
}
type PostsType = {
    id?: number,
    message: string,
    likesCount: number
}*/
const App = () => {
    return (
        <Router>
            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route path="/profile"
                           render={() => <Profile/>}/>

                    <Route path="/dialogs"
                           render={() => <
                               DialogsContainer/>}/>
                    <Route path="/news" render={() => <News/>}/>
                    <Route path="/music" render={() => <Music/>}/>
                    <Route path="/settings" render={() => <Settings/>}/>

                </div>
            </div>
        </Router>);
}
export default App;
