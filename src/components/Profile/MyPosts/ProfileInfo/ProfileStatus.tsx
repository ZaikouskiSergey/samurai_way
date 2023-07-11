import React from 'react';

type ProfileStatusPropsType = {
    status: string
}

class ProfileStatus extends React.Component<ProfileStatusPropsType> {
    state = {
        editMode: false
    }
    activateEditMode=()=> {
        this.setState({editMode: true})
    }
    deactivateEditMode() {
        this.setState({editMode: false})
    }
    render() {
        let {status} = this.props;
        return (
            <div>
                {!this.state.editMode ?
                    <div>
                        <span onDoubleClick={this.activateEditMode}>{status}</span>
                    </div>
                    :
                    <div>
                        <input autoFocus={true} value={status} onBlur={this.deactivateEditMode.bind(this)}/>
                    </div>}
            </div>
        )
    }
}

export default ProfileStatus;