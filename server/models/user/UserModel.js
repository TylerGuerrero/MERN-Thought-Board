import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

const { compare, genSalt, hash } = bcrypt
const { sign } = jwt
const { model, Schema } = mongoose

// schema defines the shape of the document in a collection 
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
        minLength: [6, "Minimum length is 6 characters"],
        maxLength: [255, "Maximum length is 255 characters"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [6, "Minimum length is 6 characters"],
        maxLength: [255, "Maximum length is 255 characters"],
        select: false
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

// this refers to the Query
userSchema.statics.login = async function(email, password) {
    try {
        const user = await this.findOne({ email }).select("+password")
        
        if (!user) throw new Error("User not found")

        const isMatch = await compare(password, user.password)

        if (isMatch) {
            return user
        } else {
            throw new Error("Password is incorrect")
        }
    } catch(error) {
        console.log(error)
        throw new Error(error.message)
    }
}

// this refers to the document
userSchema.methods.getJWT = function() {
    return sign({ id: this._id, email: this.email }, process.env.JWT_SECRET, { expiresIn: 3*24*60*60 })
}

// put userSchema into the colleciton
const User = model('User', userSchema)
export default User