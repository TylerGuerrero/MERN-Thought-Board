import * as types from '../Types'

export const signInAction = (profile) => {
    return {
        type: types.AUTH,
        payload: profile
    }
}

export const logoutAction = () => {
    return {
        type: types.LOGOUT,
        payload: null
    }
}