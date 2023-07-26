import React, {ChangeEvent} from 'react';

type ProfileStatusPropsType = {
    updateUserStatus: (status: string) => void
    status: string
}
class ProfileStatus extends React.Component<ProfileStatusPropsType> {
    state = {
        editMode: false,
        status: this.props.status
    }
    activateEditMode = () => {
        this.setState({editMode: true})
    }
    deactivateEditMode = () => {
        this.setState({editMode: false})
        this.props.updateUserStatus(this.state.status)
    }
    onStatusChange=(e:ChangeEvent<HTMLInputElement>)=>{
        this.setState({
            status: e.currentTarget.value
        })
    }
    componentDidUpdate(prevProps: Readonly<ProfileStatusPropsType>, prevState: Readonly<{}>, snapshot?: any) {
        if(prevProps.status !== this.props.status){
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        let {status} = this.props;
        return (
            <div>
                {!this.state.editMode ?
                    <div>
                        <span onDoubleClick={this.activateEditMode}>{status || "no status"}</span>
                    </div>
                    :
                    <div>
                        <input
                            autoFocus={true}
                            value={this.state.status}
                            onChange={this.onStatusChange}
                            onBlur={this.deactivateEditMode}/>
                    </div>}
            </div>
        )
    }
}

export default ProfileStatus;