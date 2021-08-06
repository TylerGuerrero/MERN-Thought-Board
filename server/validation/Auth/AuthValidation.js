import joi from 'joi'

export const registrationValidation = (body) => {
    const schema = joi.object({
        firstName: joi.string().min(5).max(255).required(),
        lastName: joi.string().min(5).max(255).required(),
        email: joi.string().min(5).max(255).required().email(),
        password: joi.string().min(5).max(255).required(),
        confirmPassword: joi.string().min(5).max(255).required()
    })

    return schema.validate(body)
}

export const loginValidation = (body) => {
    const schema = joi.object({
        email: joi.string().min(5).max(255).required().email(),
        password: joi.string().min(5).max(255).required()
    })

    return schema.validate(body)
}

export const forgetPassword = (email) => {
    return joi.string().min(5).max(255).required().email().validate(email)
}