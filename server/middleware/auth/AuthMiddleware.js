import jwt from 'jsonwebtoken'

import User from '../../models/user/UserModel.js'

const { decode, verify } = jwt

export const authCheck = async (req, res, next) => {
    const token = req.headers.authorization.spilt(" ")[1]
    const isCustomAuth = token.length < 500
    let decodedToken

    if (!token) return res.status(401).json({ error: "Token does not exist" })

    try {
        if (isCustomAuth) {
            decodedToken = verify(token, process.env.JWT_SECRET)
            const user = await User.findById(decodedToken?.id)
            req.userId = decodedToken?.id
            req.user = user
        } else {    
            decodedToken = decode(token)
            req.userId = decodedToken?.sub
        }

        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({ error: "Token not verified" })
    }
}