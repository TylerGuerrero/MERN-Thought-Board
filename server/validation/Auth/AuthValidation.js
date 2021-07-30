import joi from 'joi'

export const registrationValidation = (body) => {
    const registerBody = {
        firstName: joi.string().min(6).max(255).required(),
        lastName: joi.string().min(6).max(255).required(),
        email: joi.string().min(6).max(255).required().email(),
        password: joi.string().min(6).max(255).required(),
        confirmPassword: joi.string().min(6).max(255).required()
    }
    
    return joi.object(registerBody).validate(body)
}

export const loginValidation = (body) => {
    const loginBody = {
        email: joi.string().min(6).max(255).required().email(),
        password: joi.string().min(6).max(255).required()
    }

    return joi.object(loginBody).validate(body)
}

export const forgotPassword = (email) => {
    return joi.string().min(6).max(255).required().email().validate(email)
}