import upload from "../middlewares/multer.middleware.js";
import { Router } from "express";
import { userLogin, userRegister } from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  userRegister
);

router.route("/login").post(userLogin);

export default router; // Export the userRouter for use in the main app file
