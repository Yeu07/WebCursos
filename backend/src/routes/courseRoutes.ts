import express from 'express';
const courseRouter = express.Router();
import courseController from '../controllers/courseController.js';


courseRouter.get("/",courseController.getCourses);

courseRouter.post("/",courseController.createCoursee)


export default courseRouter;