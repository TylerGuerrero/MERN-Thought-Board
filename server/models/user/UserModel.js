import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

const { compare, genSalt, hash } = bcrypt
const { sign } = jwt
const { model, Schema } = mongoose

// defines the shape of the document in the collection
const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minLength: [6, "Minimum length is 6 characters"],
        maxLength: [255, "Maximum length is 255 characters"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        minLength: [6, "Miniumum length is 6 characters"],
        maxLength: [255, "Maximum length is 255 charcters"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [6, "Minimum length is 6 charcters"],
        maxLength: [255, "Maximum length is 255 charcters"],
        select: false
    },
    likes: {
        type: [String],
        default: []
    }
}, { timestamps: true })

// this refers to the document
userSchema.pre('save', async function(next) {
    try {
        const salt = await genSalt(12)
        this.password = await hash(this.password, salt)
        next()
    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
})

// this refers to the document
userSchema.post('save', function(doc, next) {
    console.log(doc)
    next()
})

// this has access to the query
userSchema.statics.login = async function(email, password) {
    try {
        const user = await this.findOne({ email }).select("+password")

        if (!user) throw new Error('No user found')

        const isMatch = await compare(password, user.password)

        if (isMatch) {
            return user
        } else {
            throw new Error('Password incorrect')
        }   
    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
}

// this refers to the document 
userSchema.methods.getJwt = function () {
    return sign({ id: this._id, email: this.email}, process.env.JWT_SECRET, { expiresIn: 3*24*60*60 })
}

const User = model('User', userSchema)
export default User