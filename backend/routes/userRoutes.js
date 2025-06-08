import express from "express";
import { checkAuth, signin, signup, updateProfile } from "../controllers/userCtrl.js";
import { AuthMiddleware } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post('/signup',signup);
userRouter.post('/login',signin);
userRouter.put('/update-profile',AuthMiddleware,updateProfile);
userRouter.get('/check',AuthMiddleware,checkAuth);

export default userRouter;