import express from 'express';
const courseRouter = express.Router();
import courseController from '../controllers/courseController.js';


courseRouter.get("/",courseController.getCourses);

courseRouter.get("/:id",courseController.getCourseById)

courseRouter.post("/",courseController.createCoursee)

courseRouter.delete("/:id",courseController.deleteCourse)


export default courseRouter;