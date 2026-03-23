import type { Request, Response } from 'express';

class AuthController{
    constructor(){}

    async googleSuccess(req: Request, res: Response)  {
        res.redirect('http://localhost:3000/profile');
    };
}

export default new AuthController();