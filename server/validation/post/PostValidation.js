import joi from 'joi'

export const postValidation = (body) => {
    const schema = joi.object({
        title: joi.string().min(5).max(255).required(),
        name: joi.string().min(5).max(255).required(),
        message: joi.string().min(5).max(255).required(),
        selectedFile: joi.string().min(5).max(255).required()
    })

    return schema.validate(body)
}