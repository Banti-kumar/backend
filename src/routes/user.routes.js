import upload from "../middlewares/multer.middleware.js";
import userRegister from "../controllers/user.controller.js";
import { Router } from "express";

const router = Router();

router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  userRegister
);

export default router; // Export the userRouter for use in the main app file
