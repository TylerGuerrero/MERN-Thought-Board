// action creator returns a action with a type field and a
// payload field

// dispatching a action is the only way to update the global
// state

import * as types from '../Types'
import * as api from '../../../api/index'

const likePostLoading = () => {
    return {
        type: types.LIKE_POST_LOADING,
        payload: null
    }
}

const likePostSuccess = (post) => {
    return {
        type: types.LIKE_POST_SUCCESS,
        payload: post
    }
}

const likePostError = (error) => {
    return {
        type: types.LIKE_POST_ERROR,
        payload: error
    }
}

export const likePostAction = (id) => async (dispatch) => {
    dispatch(likePostLoading())

    try {   
        const { data } = await api.likePost(id)
        dispatch(likePostSuccess(data))
    } catch (error) {
        dispatch(likePostError(error.message))
    }
}