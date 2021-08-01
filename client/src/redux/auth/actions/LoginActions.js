// action creators return a action object with a type and payload
// actions are the only way to update the global state

import * as types from '../Types'
import * as api from '../../../api/index.js'

const loginActionLoading = () => {
    return {
        type: types.LOGIN_LOADING,
        payload: null
    }
}

const loginActionSuccess = (user) => {
    return {
        type: types.LOGIN_SUCCESS,
        payload: user
    }
}

const loginActionError = (error) => {
    return {
        type: types.LOGIN_ERROR,
        payload: error
    }
}

export const loginAction = (formData, history) => async (dispatch) => {
    dispatch(loginActionLoading())

    try {
        const { data } = await api.signIn({ email: formData.email, password: formData.password })
        dispatch(loginActionSuccess(data))
        history.push("/")
    } catch (error) {
        dispatch(loginActionError(error))
    }
}
