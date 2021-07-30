import express from 'express'

import { authCheck } from '../../middleware/auth/AuthMiddleware.js'
import { registrationValidation, loginValidation } from '../../validation/auth/AuthValidation.js'

import User from '../../models/user/UserModel.js'

const { Router } = express

const router = Router()

router.post("/register", async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body
    const { error } = registrationValidation(req.body)

    if (error) return res.status(401).json({ error: error.details[0].message })
    if (confirmPassword !== password) return res.status(401).json({ error: "Passwords do not match" })

    try {
        let user = await User.findOne({ email })

        if (user) return res.status(401).json({ error: "User exist" })

        user = await User.create({ name: `${firstName} ${lastName}`, email, password })
        const token = user.getJWT()
        res.cookie("jwt", token, { httpOnly: true, maxAge: 3*24*60*60 })
        return res.status(201).json({ result: user, token })
    } catch(error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body
    const { error } = loginValidation(req.body)

    if (error) return res.status(401).json({ error: error.details[0].message })

    try {
        const user = await User.login(email, password)
        const token = user.getJWT()
        res.cookie("jwt", token, { httpOnly: true, maxAge: 3*24*60*60 })
        return res.status(201).json({ result: user, token })
    } catch(error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
})

router.get("/logout", authCheck, (req, res) => {
    res.cookie("jwt", " ", { httpOnly: true, maxAge: 3})
    return res.status(201).json({ msg: "User logged out" })
})

export default router