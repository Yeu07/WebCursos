import express, { type NextFunction } from 'express';
const courseRouter = express.Router();
import courseController from '../controllers/courseController.js';
import passport from '../config/auth.js'

const optionalAuth = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, (err: any, user: any) => {
    if (user) (req as any).user = user; 
    next();
  })(req, res, next);
};



courseRouter.get("/",courseController.getCourses);

courseRouter.get("/:id",optionalAuth as any,courseController.getCourseById)

courseRouter.post("/",courseController.createCoursee)

courseRouter.delete("/:id",courseController.deleteCourse)


export default courseRouter;