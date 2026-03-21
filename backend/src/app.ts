import express, { type Response } from 'express';
import cors from 'cors';
import courseRouter from './routes/courseRoutes.js';

const app = express();

app.use(express.json())
app.use(cors())
app.use("/cursos",courseRouter)


export default app;