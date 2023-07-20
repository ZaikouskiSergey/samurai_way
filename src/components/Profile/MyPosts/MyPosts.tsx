import React, {ChangeEvent, RefObject} from "react";
import s from './MyPosts.module.css'
import Post from "./Post/Post";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, requiredField} from "../../../utils/validators/validators";
import {kMaxLength} from "buffer";
import {Textarea} from "../../common/FormsControls/FormsControl";

type MyPostsPropsType = {
    posts: Array<PostsType>
    addPost: (newPostText: string) => void
}
type PostsType = {
    id?: number,
    message: string,
    likesCount: number
}

const MyPosts = (props: MyPostsPropsType) => {

    let postsElements = props.posts.map(p => (
        <Post message={p.message} likesCount={p.likesCount}/>
    ))
    const onAddPost = (values: AddNewPostFormType) => {
        props.addPost(values.newPostText)
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <AddNewPostFormRedux onSubmit={onAddPost} />
            <div className={s.posts}>
                {postsElements}
            </div>

        </div>
    )
}
export type AddNewPostFormType = {
    newPostText: string
}
const maxLength = maxLengthCreator(10)
const AddNewPostForm: React.FC<InjectedFormProps<AddNewPostFormType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
                <Field name={"newPostText"} component={Textarea} placeholder={'Post message'} validate={[requiredField, maxLength]}/>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}
const AddNewPostFormRedux = reduxForm<AddNewPostFormType>({form: "ProfileAddNewPostForm"})(AddNewPostForm)
export default MyPosts;