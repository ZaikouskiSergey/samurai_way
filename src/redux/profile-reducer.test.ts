import {addPostActionCreator, deletePostAC, profileReducer} from "redux/profile-reducer";

const initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 15},
        {id: 2, message: "It's my first post", likesCount: 20},
        {id: 3, message: "Blabla", likesCount: 2}
    ],
    profile: null,
    status: ''
}
it('new post should be incremented', ()=>{

    let action = addPostActionCreator("i am terminator")
    let newState = profileReducer(initialState, action)

    expect(newState.posts.length).toBe(4)
})
it('message of new post should be correct', ()=>{

    let action = addPostActionCreator("i am terminator")
    let newState = profileReducer(initialState, action)

    expect(newState.posts[3].message).toBe("i am terminator")
})

it('length post after deleting should be decrement', ()=>{

    let action = deletePostAC(1)
    let newState = profileReducer(initialState, action)

    expect(newState.posts.length).toBe(2)
    expect(newState.posts[0].message).toBe("It's my first post")
})

