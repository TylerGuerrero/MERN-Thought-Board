import jwt from 'jsonwebtoken'

const { decode, verify } = jwt

export const authCheck = async (req, res, next) => {
    const token = req.headers.authorization.spilt(" ")[1]
    const isCustomAuth = token.length < 500

    if (!token) return res.status(401).json({ error: "Token does not exist" })
    let decodedToken;

    try {
        if (token && isCustomAuth) {
            decodedToken = verify(token, process.env.JWT_SECRET)
            req.userId = decodedToken?.id
        } else {
            decodedToken = decode(token)
            req.userId = decodedToken?.sub
        }

        next()
    } catch (error) {
        return res.status(401).json({ error: error.message })
    }
}