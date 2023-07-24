import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter as Router, Route, withRouter} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";
import {connect} from "react-redux";
import {getAuthUserData} from './redux/auth-reducer';
import {compose} from "redux";


type AppContainerPropsType = {
    getAuthUserData: () => void
}
class App extends React.Component<AppContainerPropsType> {
    componentDidMount() {
        this.props.getAuthUserData()
    }
    render() {
        return (
                <div className='app-wrapper'>
                    <HeaderContainer/>
                    <Navbar/>
                    <div className='app-wrapper-content'>
                        <Route path="/profile/:userId?"
                               render={() => <ProfileContainer/>}/>

                        <Route path="/dialogs"
                               render={() => <
                                   DialogsContainer/>}/>
                        <Route path="/news" render={() => <News/>}/>
                        <Route path="/music" render={() => <Music/>}/>
                        <Route path="/settings" render={() => <Settings/>}/>
                        <Route path="/users" render={() => <UsersContainer/>}/>
                        <Route path="/login" render={() => <LoginPage/>}/>

                    </div>
                </div>
           );
    }
}

// //export default compose(
//     withRouter,
//     connect(null, {getAuthUserData})(App));

export default compose<React.ComponentType>(
    connect(null, {getAuthUserData}),
    withRouter,
)(App)