// action creators return action objects with 
// type and payload

// action are the only way to update the global state system

import * as types from '../Types'
import * as api from '../../../api/index'

const searchPostsLoading = () => {
    return {
        type: types.SEARCH_POSTS_LOADING,
        payload: null
    }
}

const searchPostsSuccess = (posts) => {
    return {
        type: types.SEARCH_POSTS_SUCCESS,
        payload: posts
    }
}

const searchPostsError = (error) => {
    return {
        type: types.SEARCH_POSTS_ERROR,
        payload: error
    }
}

export const searchPostsAction = (searchQuery) => async (dispatch) => {
    dispatch(searchPostsLoading())
   
    try {
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery)
        dispatch(searchPostsSuccess(data))
    } catch (error) {
        console.log(error)
        dispatch(searchPostsError(error.message))
    }
}