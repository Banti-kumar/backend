import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asynHandler.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { User } from "../models/user.modal.js";
import { ApiResponce } from "../utils/ApiResponce.js";

const userRegister = asyncHandler(async (req, res, next) => {
  // get user details from frontend
  const { fullName, username, email, password } = req.body;

  if (
    [fullName, username, email, password].some((field) => field?.trim() === "")
  ) {
    console.log("All fields are required", fullName, username, email, password);
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  // check for images, check for avatar

  const avatarLocalPath = req.files?.avatar[0].path;
  const coverImageLocalPath = req.files?.coverImage[0].path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (avatar) {
    throw new ApiError(500, "Avatar not uploaded");
  }

  const user = await User.create({
    username,
    email,
    fullName,
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "User not created");
  }

  res.status(201).json(new ApiResponce(201, "User created", createdUser));
});

export default userRegister;
