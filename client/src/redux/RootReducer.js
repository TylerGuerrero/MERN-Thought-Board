import { combineReducers } from 'redux'

import { postReducer } from './posts/reducers/PostsReducer'
import { authReducer } from './auth/reducers/AuthReducer'

export const rootReducer = combineReducers({
    posts: postReducer,
    auth: authReducer
})