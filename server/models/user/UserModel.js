import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

const { compare, genSalt, hash } = bcrypt
const { sign } = jwt
const { model, Schema } = mongoose

// user schema creates the shape of the documnet for a collection
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
        maxLength: [255, "Maximum length is 255 characters"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [6, "Minimum length is 6 characters"],
        maxLength: [255, "Maximum length is 255 characters"],
        select: false
    }
}, { timestamps: true })

// this refers to the doc
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

// this refers to the query
userSchema.statics.login = async function(email, password) {
    try {
        const user = await this.findOne({ email }).exec()

        if (!user) throw new Error('User does not exist')

        const isMatch = await compare(password, user.password)

        if (isMatch) {
            return user
        } else {
            throw new Error('Password does not match')
        }
    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
}

// this refers to doc
userSchema.methods.getJWT = function() {
    return sign({ id: this._id, email: this.email}, process.env.JWT_SECRET, { expiresIn: 3*24*24*60 })
}

// create the collection for a user Schema
const User = model('User', userSchema)
export default User