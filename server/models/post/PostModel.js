import mongoose from 'mongoose'

const { model, Schema } = mongoose

// schema defines the documents shape for the collection
const postSchema = new Schema({
    title: { type: String },
    name: { type: String },
    creator: { type: String},
    message: { type: String },
    selectedFile: { type: String },
    likes: { type: [String], default: [] },
    tags: { type: [String] }
}, { timestamps: true })

// puts post schema into collection
const Post = model('Post', postSchema)
export default Post