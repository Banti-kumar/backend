import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asynHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.modal.js";

const protect = asyncHandler(async (req, _, next) => {
  try {
    // Get the token from the request headers or cookies

    const token =
      req.cookies?.accessToken ||
      req.headers?.("Authorization")?.replace("Bearer ", "");

    // Check if the token exists
    if (!token) {
      throw new ApiError(401, "Unauthorised");
    }

    // Verify the token and get the user by the user ID

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by the user ID and exclude the password and refresh token fields

    const user = await User.findById(decoded._id).select(
      "-password -refreshToken"
    );

    // Check if the user exists in the database

    if (!user) {
      throw ApiError(401, "Invalid Access Token");
    }

    req.User = user; // Attach the user to the request object
    next(); // Call the next middleware if the user exists
  } catch (error) {
    throw new ApiError(401, "Unauthorised");
  }
});

export { protect };
