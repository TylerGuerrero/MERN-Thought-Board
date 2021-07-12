import mongoose from 'mongoose'

const { Schema, model } = mongoose

const postSchema = new Schema({
   title: {
       type: String,
    },
   message: {
       type: String,
    },
    creator: {
        type: String, 
    },
    tags: {
        type: [String],
    },
    selectedFile: {
        type: String,
    },
    likeCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

const Post = model('Post', postSchema)
export default Post