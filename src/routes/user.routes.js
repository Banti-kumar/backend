import upload from "../middlewares/multer.middleware.js";
import { Router } from "express";
import { protect } from "../middlewares/user.middleware.js";

import {
  userLogin,
  userLogout,
  userRegister,
  refreshAccessToken,
} from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  userRegister
);

router.route("/login").post(userLogin);

// SET PROTECT MIDDLEWARE

router.route("/logout").post(protect, userLogout);

router.route("/refreshtoken").post(refreshAccessToken);

export default router; // Export the userRouter for use in the main app file
