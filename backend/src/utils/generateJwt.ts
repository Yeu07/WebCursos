import jwt from 'jsonwebtoken'

const generateJwt = (user:any) => {
    let token = null
    const token_payload = {
        sub: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        pictureUrl: user.pictureUrl
    }
    token = jwt.sign(token_payload, process.env.SECRET_JWT as string);
    return token

}

export default generateJwt