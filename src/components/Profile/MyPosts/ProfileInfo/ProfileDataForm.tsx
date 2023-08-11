import React from 'react';
import {ProfileAPIProps} from "components/Profile/ProfileContainer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "components/common/FormsControls/FormsControl";
type ProfileDataFormType = {
    profile: ProfileAPIProps
}
const ProfileDataForm: React.FC<InjectedFormProps<ProfileDataFormType>> = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div><button onClick={()=>{}}>save</button></div>
            <div>
                <div><b>Full name</b>:
                    <Field
                    placeholder={'full name'}
                    name={'fullName'}
                    component={Input}
                    />
                </div>
                <div><b>Looking for a job:</b> {profile.lookingForAJob ? 'yes' : 'no'}</div>
                {profile.lookingForAJob && <div><b>My skills</b>profile.lookingForAJobDescription</div>}


                <div><b>About me:</b> {profile.aboutMe}</div>
                {/*<div>*/}
                {/*    <b>Contacts:</b>*/}
                {/*    {Object.keys(profile.contacts).map(key => {*/}
                {/*        return <Contact key={key} contactsTitle={key} contactsValue={profile.contacts[key]}/>*/}

                {/*    })} </div>*/}
            </div>
        </form>

    );
};

const ProfileDataFormReduxForm = reduxForm({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataFormReduxForm;