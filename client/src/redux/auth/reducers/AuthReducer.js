import * as types from '../Types'

const initState = {
    authData: null
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
        default:
            return state
    }
}