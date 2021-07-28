import joi from 'joi'

export const registrationValidation = (body) => {
    const registrationBody = {
        firstName: joi.string().min(3).max(255).required(),
        lastName: joi.string().min(3).max(255).required(),
        email: joi.string().min(6).max(255).required().email(),
        password: joi.string().min(6).max(255).required(),
        confirmPassword: joi.string().min(6).max(255).required()
    }

    return joi.object(registrationBody).validate(body)
}

export const loginValidation = (body) => {
    const loginObject = {
        email: joi.string().min(6).max(255).required().email(),
        password: joi.string().min(6).max(255).required()
    }

    return joi.object(loginObject).validate(body)
}

export const forgotpasswordValidation = (email) => {
    return joi.string().min(6).max(255).required().email().validate(email)
}