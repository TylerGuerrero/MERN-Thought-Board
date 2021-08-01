import express from 'express'

import { authCheck } from '../../middleware/auth/AuthMiddleware.js'

import { registrationValidation, loginValidation } from '../../validation/auth/AuthValidation.js'

import User from '../../models/user/UserModel.js'

const { Router } = express

const router = Router()

// route for register for a user 
router.post("/register", async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body
    const { error } = registrationValidation(req.body)
    
    if (error) return res.status(401).json({ error: error.details[0].message })
    if (password !== confirmPassword) return res.status(401).json({ error: "Passwords do not match" })

    try {
        let user = await User.findOne({ email }).exec()

        if (user) throw new Error("User already exist")

        user = await User.create({ name: `${firstName} ${lastName}`, email, password })
        const token = user.getJWT()
        res.cookie("jwt", token, { httpOnly: true, maxAge: 3*24*60*60 })
        return res.status(201).json({ result: user, token })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
})

// route for login for a user
router.post("/login", async (req, res) => {
    const { email, password } = req.body
    const { error } = loginValidation(req.body)
    
    if (error) return res.status(401).json({ error: error.details[0].message })

    try {
        const user = await User.login(email, password)
        const token = user.getJWT()
        res.cookie("jwt", token, { httpOnly: true, maxAge: 3*24*60*60 })
        return res.status(201).json({ result: user, token })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
})

// route for logout for a user
router.get("/logout", authCheck, (req, res) => {
    res.cookie("jwt", " ", { httpOnly: true, maxAge: 3 })
    return res.status(201).json({ msg: "User logged out"})
})

export default router