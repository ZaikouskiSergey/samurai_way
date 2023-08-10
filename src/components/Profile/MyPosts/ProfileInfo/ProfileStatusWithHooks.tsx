import React, {ChangeEvent, FC, useEffect, useState} from 'react';
type ProfileStatusPropsType = {
    updateUserStatus: (status: string) => void
    status: string
}
export const ProfileStatusWithHooks: FC<ProfileStatusPropsType> = ({updateUserStatus, status}) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [statusProfile, setStatusProfile] = useState<string>(status)
    //
    useEffect(()=>{
        setStatusProfile(status);
        return ()=>{
            //
        }
    }
    , [])
    const activateEditMode = () => {
        setEditMode(true)
    }
    const inputProfileStatusOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatusProfile(e.currentTarget.value)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        updateUserStatus(statusProfile)
    }
    return (
        <div>
            {!editMode ?
                <div>
                    <b>Status: </b><span onDoubleClick={activateEditMode}>{status || "no status"}</span>
                </div>
                :
                <div>
                    <input
                        autoFocus={true}
                        value={statusProfile}
                        onChange={inputProfileStatusOnChange}
                        onBlur={deactivateEditMode}/>
                </div>
            }
        </div>
    )
}


