import express, { type Response } from 'express';
import courseRouter from './routes/courseRoutes.js';

const app = express();
app.use(express.json())

app.use("/cursos",courseRouter)


export default app;