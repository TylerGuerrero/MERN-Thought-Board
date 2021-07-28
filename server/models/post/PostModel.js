import mongoose from 'mongoose'

const { model, Schema } = mongoose

// schema defines the shape of the document for the collection
const postSchema = new Schema({
    title: {type: String},
    name: {type: String},
    creator: {type: String},
    message: {type: String},
    selectedFile: {type: String},
    tags: {type: [String]},
    likes: {type: [String], default: []}
}, { timestamps: true })

const Post = model('Post', postSchema)
export default Post