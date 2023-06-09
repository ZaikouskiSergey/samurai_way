import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import styles from "./Login.module.css"

type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
}
export const LoginForm: React.FC<InjectedFormProps <FormDataType> >= (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'login'} component={"input"} name={"login"}/>
            </div>
            <div>
                <Field placeholder={'password'} component={"input"} name={"password"}/>
            </div>
            <div>
                <Field component={"input"} type={"checkbox"} name={"rememberMe"}/> remember me
            </div>
            <div>
                <button>login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)
export const Login = () => {
    const onSubmit = (formData:FormDataType)=> {
        console.log(formData)
    }

    return (
        <div className={styles.formLogin}>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
};
export default Login;