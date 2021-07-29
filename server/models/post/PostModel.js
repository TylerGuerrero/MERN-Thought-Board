import mongoose from 'mongoose'

const { model, Schema } = mongoose

// Schema defines the shape of the document 
const postSchema = new Schema({
    title: { type: String },
    name: { type: String },
    creator: { type: String },
    message: { type: String },
    selectedFile: { type: String },
    tags: { type : [String] },
    likes: { type: [String], default: [String] }
}, { timestamps: true })

// create the collection of post documents
const Post = model('Post', postSchema)
export default Post