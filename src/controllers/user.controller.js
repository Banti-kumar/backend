import asyncHandler from "../utils/asynHandler.js";

const userRegister = asyncHandler(async (req, res, next) => {
  // Code to register a new user
  res.status(200).json({ message: "User registered successfully" });
});

export default userRegister;
