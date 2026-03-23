import { Router } from 'express';
import passport from 'passport';
import authController from '../controllers/authController.js';

const authRouter = Router();

authRouter.get('/google',
  passport.authenticate('google', { scope: ['profile','email'] })
);

authRouter.get('/google/callback',
  passport.authenticate('google', { failureRedirect: 'http://localhost:3000/login' }),
  authController.googleSuccess
);

export default authRouter;