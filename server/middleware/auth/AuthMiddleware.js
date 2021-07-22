import jwt from 'jsonwebtoken'

const { verify, decode } = jwt

export const authCheck = async (req, res, next) => {
    // const token = req.cookies.jwt
    const token = req.headers.authorization.split(" ")[1]
    const isCustomAuth = token.length < 500

    if (!token) return res.status(401).json({ error: "Token does not exist" })
    let decodeToken;

    try {

        if (token && isCustomAuth) {
            decodedToken = verify(token, process.env.JWT_SECRET)
            req.userId = decodeToken?.id
        
        } else {
            decodeToken = decode(token)
            req.userId = decodeToken?.sub
        }

        next()
    } catch (error) {   
        return res.status(401).json({ msg: "User does not exist" })
    }
}