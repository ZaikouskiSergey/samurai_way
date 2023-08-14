import React, {ReactNode} from 'react';
import {ProfileAPIProps} from "components/Profile/ProfileContainer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input, Textarea} from "components/common/FormsControls/FormsControl";
import s from './ProfileInfo.module.css';
import styles from "components/Login/Login.module.css";

type ProfileDataFormType = {
    profile: ProfileAPIProps
    children?: ReactNode

}
const ProfileDataForm: React.FC<InjectedFormProps & ProfileDataFormType> = ({handleSubmit, error, profile}) => {
    console.log('profile:', profile)
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <button>save</button>
            </div>
            {error && <div className={styles.formSummaryError}>{error}</div>}
            <div>
                <div><b>Full name</b>:
                    <Field
                        placeholder={'full name'}
                        name={'fullName'}
                        component={Input}
                    />
                </div>
                <div><b>Looking for a job:</b>
                    <Field
                        placeholder={''}
                        name={'lookingForAJob'}
                        component={Input}
                        type={"checkbox"}
                    />
                </div>
                <div><b>My skills:</b>
                    <Field
                        placeholder={'My skills'}
                        name={'lookingForAJobDescription'}
                        component={Textarea}
                    />
                </div>
                <div><b>About me:</b>
                    <Field
                        placeholder={'About me:'}
                        name={'aboutMe'}
                        component={Textarea}
                    />
                </div>
                <div>
                    <b>Contacts:</b>
                    {Object.keys(profile.contacts).map(key => {
                        return <div key={key} className={s.contact}>
                            <b>{key}:</b>
                            <Field
                                placeholder={key}
                                name={`contacts.${key}`}
                                component={Input}
                            />

                        </div>
                    })}
                </div>
            </div>
        </form>

    );
};

const ProfileDataFormReduxForm = reduxForm<{}, any>({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataFormReduxForm;