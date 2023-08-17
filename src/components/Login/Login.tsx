import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import styles from "./Login.module.css"
import {Input} from "../common/FormsControls/FormsControl";
import {requiredField} from "utils/validators/validators";
import {connect} from "react-redux";
import {loginTC} from "redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {RootState} from "redux/redux-store";

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
export const LoginForm: React.FC<InjectedFormProps & any> = ({handleSubmit, error, captchaUrl}) => {
    console.log(captchaUrl)
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field placeholder={'email'}
                       validate={[requiredField]}
                       component={Input} name={"email"}
                />
            </div>
            <div>
                <Field placeholder={'password'}
                       validate={[requiredField]} component={Input} name={"password"} type={"password"}/>
            </div>
            <div>
                <Field component={Input} type={"checkbox"} name={"rememberMe"}/> remember me
            </div>

            {captchaUrl && <img src={captchaUrl}/>}
            {captchaUrl &&  <div>
                <Field placeholder={'fill with picture'}
                                   validate={[requiredField]}
                                   component={Input}
                                   name={"captcha"}
            />
            </div>}
            {error && <div className={styles.formSummaryError}> {error}</div>}
            <div>
                <button>login</button>
            </div>
        </form>
    )
}
const LoginReduxForm = reduxForm<{}, any>({form: 'login'})(LoginForm)
const Login = (props: any) => {
    const onSubmit = (formData: FormDataType) => {
        const {email, password, rememberMe, captcha} = formData
        props.loginTC(email, password, rememberMe, captcha)

    }
    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }
    return (
        <div className={styles.formLogin}>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl = {props.captchaUrl}/>
        </div>
    );
};
const mapStateToProps = (state: RootState) => {
    return {
        captchaUrl: state.auth.captchaUrl,
        isAuth: state.auth.isAuth
    }
}
export default connect(mapStateToProps, {loginTC})(Login);