// Action creator returns a action object with a type field
// and a payload field

// Action is the only way to update the global managment store
// and have a action reduced

import * as types from '../Types'
import * as api from '../../../api/index'

const fetchPostsLoading = () => {
    return {
        type: types.FETCH_POSTS_LOADING,
        payload: null
    }
}

const fetchPostsSuccess = (posts) => {
    return {
        type: types.FETCH_POSTS_SUCCESS,
        payload: posts
    }
}

const fetchPostsError = (error) => {
    return {
        type: types.FETCH_POSTS_ERROR,
        payload: error
    }
}

export const fetchPosts = (page) => async (dispatch) => {
    dispatch(fetchPostsLoading())

    try {   
        const { data } = await api.fetchPost(page)
        console.log(page)
        dispatch(fetchPostsSuccess(data))
    } catch (error) {
        dispatch(fetchPostsError(error.message))
    }
}   