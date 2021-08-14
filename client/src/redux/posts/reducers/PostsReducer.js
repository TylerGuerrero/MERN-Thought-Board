// state object is binded to the initial state object
// action object is binded to the object from dispatch method

// (prevState, action) => nextState

// state is immutable meaning you cant change it, you can
// only create a new state and replace it with the old one,
// this is done for debugging purpose, when dealing with state
// you want to see how the state changes through out time. 
// This is useful for debugging reasons

// the state that is returned has to be the same type of 
// object as it was for the initial state

import * as types from '../Types'

const initialState = {
    loading: false,
    posts: [],
    error: null,
    currentPage: null,
    numberOfPages: null
}

export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_POSTS_LOADING:
            return {
                ...state,
                loading: true,
                error: null
            }
        case types.FETCH_POSTS_SUCCESS: 
            return {
                ...state,
                loading: false,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
                error: null
            }
        case types.FETCH_POSTS_ERROR:
            return {
                ...state,
                loading: false,
                posts: [],
                error: action.payload
            }
        case types.SEARCH_POSTS_LOADING:
            return {
                ...state,
                loading: true,
                error: null
            }
        case types.SEARCH_POSTS_SUCCESS:
            return {
                ...state,
                loading: false,
                posts: action.payload,
                error: null
            }
        case types.SEARCH_POSTS_ERROR: 
            return {
                ...state,
                loading: false,
                posts: [],
                error: action.payload
            }
        case types.CREATE_POST_LOADING: 
            return {
                ...state,
                loading: true,
                error: null
            }
        case types.CREATE_POST_SUCCESS:
            return {
                ...state,
                posts: [...state.posts, action.payload],
                loading: false,
                error: null
            }
        case types.CREATE_POST_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case types.UPDATE_POST_LOADING:
            return {
                ...state,
                loading: true,
                error: null
            }
        case types.UPDATE_POST_SUCCESS:
            return {
                ...state,
                loading: false,
                posts: state.posts.map((post) => post._id === action.payload._id ? action.payload: post),
                error: null
            }
        case types.UPDATE_POST_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case types.DELETE_POST_LOADING:
            return {
                ...state,
                loading: true,
                error: null
            }
        case types.DELETE_POST_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                posts: state.posts.filter((post) => post._id !== action.payload._id)
            }
        case types.DELETE_POST_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case types.LIKE_POST_LOADING:
            return {
                ...state,
                loading: true,
                error: null
            }
        case types.LIKE_POST_SUCCESS:
            return {
                ...state,
                loading: false,
                posts: state.posts.map((post) => post._id === action.payload._id ? action.payload: post),
                error: null
            }
        case types.LIKE_POST_ERROR:
            return {
                ...state,
                loading: false,
                error: action.paylaod
            }
        default:
            return state
    }
}