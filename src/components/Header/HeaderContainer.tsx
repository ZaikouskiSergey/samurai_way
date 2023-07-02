import React from "react";
import Header from "./Header";
import axios from "axios";
import {InitialStateAuthType, setAuthUserData} from "../../redux/auth-reducer";
import {connect} from "react-redux";

type AuthResponseType = {
    data: {
        id: number
        login: string
        email: string
    }
    resultCode: number
    messages: string | Array<string>
    fieldsErrors: string | Array<string>
}
type HeaderContainerPropsType={
    setAuthUserData : (userId: number|null, email: string|null, login: string|null) => void
    isAuth: boolean
    login: string
}
class HeaderContainer extends React.Component<HeaderContainerPropsType, any> {
    componentDidMount() {
        axios.get<AuthResponseType>(`https://social-network.samuraijs.com/api/1.0//auth/me`, {
            withCredentials:true
        })
            .then(response => {
                if (response.data.resultCode === 0){
                    let {login,id,email} = response.data.data
                    this.props.setAuthUserData(id, email, login)
                }
            })
    }
    render(){
        return <Header {...this.props}
                       isAuth={this.props.isAuth}
                       login={this.props.login}/>
    }
}
const mapStateToProps=(state:InitialStateAuthType)=>{
    return {
        isAuth: state.isAuth,
        login: state.isAuth
    }

}
export default connect (mapStateToProps, {setAuthUserData} )(HeaderContainer);