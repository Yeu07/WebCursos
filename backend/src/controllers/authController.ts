import type { Request, Response } from 'express';
import generateJwt from '../utils/generateJwt.js';

class AuthController{
    constructor(){}

    async googleSuccess(req: Request, res: Response)  {
        const { _id, firstName, lastName, email, pictureUrl } = req.user as any;
        const userData = {
            sub:_id,
            firstName,
            lastName,
            email,
            pictureUrl
        }
        const jwt = generateJwt(userData)
        const login_info = JSON.stringify({jwt, user:userData})
        res.redirect(`http://localhost:3000/profile?login_info=${login_info}`);
    };
}

export default new AuthController();