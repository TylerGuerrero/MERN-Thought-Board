import { combineReducers } from 'redux'

import { postReducer } from './posts/reducers/PostsReducer'

export const rootReducer = combineReducers({
    posts: postReducer
})