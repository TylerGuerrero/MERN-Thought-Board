// action creators return a action object with a type and payload
// actions are the only way to update the global state

import * as types from '../Types.js'
import * as api from '../../../api/index.js'

const registerLoading = () => {
    return {
        type: types.REGISTER_LOADING,
        payload: null
    }
}

const registerSuccess = (user) => {
    return {
        type: types.REGISTER_SUCCESS,
        payload: user
    }
}

const registerError = (error) => {
    return {
        type: types.REGISTER_ERROR,
        payload: error
    }
}

export const registerAction = (formData, history) => async (dispatch) => {
    dispatch(registerLoading())

    try {
        const { data } = await api.signUp(formData)
        dispatch(registerSuccess(data))
        history.push("/")
    } catch (error) {
        dispatch(registerError(error))
    }
}