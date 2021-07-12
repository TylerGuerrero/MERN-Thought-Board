import joi from 'joi'

export const postValidation = (body) => {
    const postBody = {
        title : joi.string().min(5).max(100).alphanum().required(),
        message: joi.string().min(5).max(280).required(),
        creator: joi.string().min(5).max(100).required(),
        likeCount: joi.number().required(),
        selectedFile: joi.string().base64().required()
    }

    return joi.object(postBody).validate(body)
}