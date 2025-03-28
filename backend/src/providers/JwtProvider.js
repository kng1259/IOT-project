import JWT from 'jsonwebtoken'

const generateToken = async (userInfo, privateKey, tokenLife) => {
    return JWT.sign(userInfo, privateKey, { algorithm: 'HS256', expiresIn: tokenLife })
}

const verifyToken = async (token, privateKey) => {
    return JWT.verify(token, privateKey)
}

export const JwtProvider = {
    generateToken,
    verifyToken
}
