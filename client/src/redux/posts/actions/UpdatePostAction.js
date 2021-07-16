// action creator return a action object that has a type field
// and a payload field

// dispatching a action is the only way to update the 
// global state managment system

import * as types from '../Types'
import * as api from '../../../api/index'

const updatePostLoading = () => {
    return {
        type: types.UPDATE_POST_LOADING,
        payload: null
    }
}

const updatePostSuccess = (post) => {
    return {
        type: types.UPDATE_POST_SUCCESS,
        payload: post
    }
}

const updatePostError = (error) => {
    return {
        type: types.UPDATE_POST_ERROR,
        payload: error
    }
}

export const updatePostAction = (id, post) => async (dispatch) => {
    dispatch(updatePostLoading())

    try {
        const { data } = await api.updatePost(id, post)
        dispatch(updatePostSuccess(data))
    } catch (error) {
        dispatch(updatePostError(error.message))
    }
}