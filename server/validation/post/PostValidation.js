import joi from 'joi'

export const postValidation = (body) => {
    const postBody = {
        title: joi.string().min(6).max(255),
        name: joi.string().min(6).max(280),
        message: joi.string().min(6).max(255),
        tags: joi.string().min(6).max(255),
        selectedFile: joi.string().min(6).max(255).base64(),
    }

    return joi.object(postBody).validate(body)
}