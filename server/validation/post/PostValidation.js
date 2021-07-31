import joi from 'joi'

export const postValidation = (body) => {
    const postBody = {
        title: joi.string().min(6).max(255).required(),
        name: joi.string().min(6).max(255).required(),
        creator: joi.string().required().uuid(),
        message: joi.string().min(6).max(400).required(),
        selectedFile: joi.string().base64().required()
    }

    return joi.object(postBody).validate(body)
}