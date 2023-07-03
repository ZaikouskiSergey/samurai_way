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
type HeaderContainerPropsType = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null) => void
    isAuth: boolean
    login: string
}

class HeaderContainer extends React.Component<any, any> {
    componentDidMount() {
        axios.get<AuthResponseType>(`https://social-network.samuraijs.com/api/1.0//auth/me`,
            {withCredentials: true})
            .then(response => {
                if (response.data.resultCode === 0) {
                    let {id, login, email} = response.data.data
                    this.props.setAuthUserData(id, login, email)
                }
            })
    }

    render() {
        debugger
        return <Header login={this.props.login} isAuth={this.props.isAuth}/>
    }
}

const mapStateToProps = (state: any) => {
    debugger
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }

}
export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer);