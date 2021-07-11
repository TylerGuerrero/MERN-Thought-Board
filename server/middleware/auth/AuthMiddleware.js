import jwt from 'jsonwebtoken'

import User from '../../models/user/UserModel.js'

const { verify } = jwt

export const authCheck = async (req, res, next) => {
    const token = req.cookies.jwt

    if (!token) return res.status(201).json({ error: "JWT does not exist" })

    try {
        const decodedToken = verify(token, process.env.JWT_SECRET)

        const user = await User.findById(decodedToken.id)

        if (!user) return res.status(401).json({ msg: "User does not exist" })

        req.user = user
        next()
    } catch (error) {   
        return res.status(401).json({ msg: "User does not exist" })
    }
}