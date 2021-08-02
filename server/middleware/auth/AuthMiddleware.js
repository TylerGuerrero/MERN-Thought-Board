import jwt from 'jsonwebtoken'

import User from '../../models/user/UserModel.js'

const { verify, decode } = jwt

export const authCheck = async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1]
    const isCustom = token.length < 500
    let decodedToken

    if (!token) return res.status(401).json({ error: "Token does not exist" })

    try {
        if (isCustom) {
            decodedToken = verify(token, process.env.JWT_SECRET)
            const user = await User.findById(decodedToken?.id).exec()

            if (!user) throw new Error('User does not exist')
            
            req.user = user
            req.userId = decodedToken?.id
        } else {
            decodedToken = decode(token)
            req.userId = decodedToken?.sub
        }

        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
}