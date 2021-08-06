import mongoose from 'mongoose'

const { model, Schema } = mongoose

// post schema creates the shape of the documents in a collection
const postSchema = new Schema({
    title: { type: String },
    name: { type: String },
    creator: { type: String },
    message: { type: String },
    selectedFile : { type: String },
    tags: { type: [String] },
    likes: { type: [String], default: []}
}, { timestamps: true })

// creates a posts colleciton for post documents
const Post = model('Post', postSchema)
export default Post

