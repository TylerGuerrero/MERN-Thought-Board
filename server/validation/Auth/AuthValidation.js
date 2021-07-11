import joi from 'joi'

export const registrationValidation = (body) => {
    const registrationBody = {
        username: joi.string().min(6).max(255).required().empty(),
        email: joi.string().min(6).max(255).required().email().empty(),
        password: joi.string().min(6).max(255).required().empty()
    }

    return joi.object(registrationBody).validate(body)
}

export const loginValidation = (body) => {
    const loginObject = {
        email: joi.string().min(6).max(255).required().empty().email(),
        password: joi.string().min(6).max(255).required().empty()
    }

    return joi.object(loginObject).validate(body)
}

export const forgotpasswordValidation = (email) => {
    return joi.string().min(6).max(255).required().email().empty().validate(email)
}