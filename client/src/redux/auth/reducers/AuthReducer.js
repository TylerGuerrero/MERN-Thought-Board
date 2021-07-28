import * as types from '../Types'

const initState = {
    loading: false,
    authData: null,
    error: null
}

export const authReducer = (state = initState, action) => {
    switch (action.type) {
        case types.AUTH:
            localStorage.setItem('profile', JSON.stringify(action?.payload))
            return {
                ...state,
                authData: action?.payload
            }
        case types.LOGOUT:
            localStorage.clear()
            return {
                ...state,
                authData: null
            }
        case types.REGISTER_LOADING: 
            return {
                ...state,
                loading: true,
                authData: null,
                error: null
            }
        case types.REGISTER_SUCCESS: 
            localStorage.setItem("profile", JSON.stringify(action.payload))
            return {
                ...state,
                loading: false,
                authData: action?.payload,
                error: null
            }
        case types.REGISTER_ERROR: 
            return {
                ...state,
                loading: false,
                authData: null,
                error: action.payload
            }
        case types.LOGIN_LOADING:
            return {
                ...state,
                loading: true,
                authData: null,
                error: null
            }
        case types.LOGIN_SUCCESS:
            localStorage.setItem("profile", JSON.stringify(action.payload))
            return {
                ...state,
                loading: false,
                authData: action?.payload,
                error: null
            }
        case types.LOGIN_ERROR:
            return {
                ...state,
                loading: false,
                authData: null,
                error: action?.payload
            }
        default:
            return state
    }
}