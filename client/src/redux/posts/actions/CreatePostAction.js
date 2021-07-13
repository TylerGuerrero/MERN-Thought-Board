// action creators return an action object with field 
// values of type and payload

// actions is the only way to update you global state

import * as types from '../Types'
import * as api from '../../../api/index'

const createPostLoading = () => {
    return {
        type: types.CREATE_POST_LOADING,
        payload: null
    }
}

const createPostSuccess = (post) => {
    return {
        type: types.CREATE_POST_SUCCESS,
        payload: post
    }
}

const createPostError = (error) => {
    return {
        type: types.CREATE_POST_ERROR,
        payload: error
    }
}

export const createPostAction = (post) => async (dispatch) => {
    dispatch(createPostLoading())

    try {
        const { data } = await api.createPost(post)
        dispatch(createPostSuccess(data))
    } catch (error) {
        dispatch(createPostError(error.message))
    }
}