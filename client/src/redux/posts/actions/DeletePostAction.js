// action creator returns a action with a type field and a
// payload field

// dispatching a action is the only way to update the global
// state

import * as types from '../Types'
import * as api from '../../../api/index'

const deletePostLoading = () => {
    return {    
        type: types.DELETE_POST_LOADING,
        payload: null
    }
}

const deletePostSuccess = (id) => {
    return {
        type: types.DELETE_POST_SUCCESS,
        payload: { _id: id }
    }
}

const deletePostError = (error) => {
    return {
        type: types.DELETE_POST_ERROR,
        payload: error
    }
}

export const deletePostAction = (id) => async (dispatch) => {
    dispatch(deletePostLoading())

    try {
        await api.deletePost(id)
        dispatch(deletePostSuccess(id))
    } catch (error) {
        dispatch(deletePostError(error.message))
    }
}