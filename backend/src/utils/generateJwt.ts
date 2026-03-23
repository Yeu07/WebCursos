import jwt from 'jsonwebtoken'

const generateJwt = (payload:any) => {
    let token = null
        token = jwt.sign(payload, process.env.SECRET_JWT as string);
    return token

}

export default generateJwt