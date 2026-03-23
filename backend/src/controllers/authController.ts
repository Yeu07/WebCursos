import type { Request, Response } from 'express';
import generateJwt from '../utils/generateJwt.js';

class AuthController{
    constructor(){}

    async googleSuccess(req: Request, res: Response)  {
        const jwt = generateJwt(req.user)
        res.redirect(`http://localhost:3000/profile?jwt=${jwt}`);
    };
}

export default new AuthController();