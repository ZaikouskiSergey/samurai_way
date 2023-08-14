import React from 'react';
import {ProfileAPIProps} from "components/Profile/ProfileContainer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input, Textarea} from "components/common/FormsControls/FormsControl";

type ProfileDataFormType = {
    profile: ProfileAPIProps
}
const ProfileDataForm: React.FC<InjectedFormProps<any>> = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <button>save</button>
            </div>
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
               {/* <div>
                    <b>Contacts:</b>
                    {Object.keys(profile.contacts).map(key => {
                        return <Contact key={key} contactsTitle={key} contactsValue={profile.contacts[key]}/>

                    })}
                </div>*/}
            </div>
        </form>

    );
};

const ProfileDataFormReduxForm = reduxForm({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataFormReduxForm;