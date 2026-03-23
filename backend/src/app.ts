import express, { type Response } from 'express';
import cors from 'cors';
import session from 'express-session';
import courseRouter from './routes/courseRoutes.js';
import authRouter from './routes/authRoutes.js';
import passport from './config/auth.js'

const app = express();

app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
}));

app.use(express.json())
app.use(cors())
app.use(passport.initialize())
app.use(passport.session());

app.use("/cursos",courseRouter)
app.use('/auth', authRouter);


export default app;