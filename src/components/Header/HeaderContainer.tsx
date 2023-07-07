import React from "react";
import Header from "./Header";
import {getAuthUserData} from "../../redux/auth-reducer";
import {connect} from "react-redux";
import {RootState} from "../../redux/redux-store";

type HeaderContainerPropsType = {
    getAuthUserData: () => void
    isAuth: boolean | null
    login: string | null
}

class HeaderContainer extends React.Component<HeaderContainerPropsType> {
    componentDidMount() {
        this.props.getAuthUserData()
    }
    render() {
        return <Header login={this.props.login} isAuth={this.props.isAuth}/>
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}
export default connect(mapStateToProps, {getAuthUserData})(HeaderContainer);