import { Router } from "express";
import passport from "passport";
import paypalController from "../controllers/paypalController.js";

const paypalRouter = Router();

const requireAuth = passport.authenticate("jwt", { session: false });

paypalRouter.post("/create-order", requireAuth, paypalController.createOrder);
paypalRouter.post("/capture-order", requireAuth, paypalController.captureOrder);

export default paypalRouter;