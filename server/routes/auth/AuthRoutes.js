import express from 'express'

// Validations
import { registrationValidation, loginValidation } from '../../validation/auth/AuthValidation.js'

// Models
import User from '../../models/user/UserModel.js'

// Middleware
import { authCheck } from '../../middleware/auth/AuthMiddleware.js'

const { Router } = express
const router = Router()

// route for registering a user
router.post("/register", async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body
    const { error } = registrationValidation(req.body)

    if (error) return res.status(401).json({ error: error.details[0].message })
    if (password !== confirmPassword) return res.status(401).json({ error: "Passwords do not match" })

    try {
        let user = await User.findOne({ email }).exec()

        if (user) throw new Error('User already exist')

        user = await User.create({ name: `${firstName} ${lastName}`, email, password })
        const token = user.getJWT()
        res.cookie("jwt", token, { maxAge: 3*24*24*60, httpOnly: true })
        return res.status(201).json({ result: user, token })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
})

// route for logining in a user
router.post("/login", async (req, res) => {
    const { email, password } = req.body
    const { error } = loginValidation(req.body)

    if (error) return res.status(401).json({ error: error.details[0].message })

    try {
        const user = await User.login(email, password)
        const token = user.getJWT()
        res.cookie("jwt", token, { maxAge: 3*24*60*60, httpOnly: true })
        return res.status(201).json({ result: user, token })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
})

// route to sign out
router.get("/logout", (req, res) => {
    res.cookie("jwt", " ", { maxAge: 3, httpOnly: true })
})

export default router