import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

const { hash, compare, genSalt } = bcrypt
const { Schema, model } = mongoose
const { sign } = jwt

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minLength: [6, "Minimum character length is 6"],
        maxLength: [255, "Maximum character length is 255"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        minLength: [6, "Minimum character length is 6"],
        maxLength: [255, "Maximum charcter length is 255"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [6, "Minimum character length is 6"],
        maxLength: [255, "Maximum character length is 255"],
        select: false
    },
    likes: {
        type: [String],
        default: []
    }
}, { timestamps: true })

// this has access to the document
userSchema.pre('save', async function(next) {
    try {   
        const salt = await genSalt(12)
        this.password = await hash(this.password, salt)
        next()
    } catch (error) {
        throw new Error(error.message)
    }
})

// this has access to the document
userSchema.post('save', function(doc, next) {
    console.log(doc)
    next()
})

// this has access to the query
userSchema.statics.login = async function(email, password) {
    try {
         const user = await this.findOne({ email }).select("+password")

         if (!user) throw new Error("User does not exist")

         const isMatch = await compare(password, user.password)

         if (isMatch) {
            return user
         } else {
            throw new Error("Passwords do not match")
         }
    } catch (error) {
        throw new Error(error.message)
    }
}

userSchema.methods.getJWT = function() {
    return sign({id: this._id, email: this.email}, process.env.JWT_SECRET, { expiresIn: 3*24*60*60 })
}

const User = model('User', userSchema)
export default User
