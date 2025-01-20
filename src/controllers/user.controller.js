import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asynHandler.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { User } from "../models/user.modal.js";
import { ApiResponce } from "../utils/ApiResponce.js";


const generateAccessAndRefereshTokens = async (userId) => {
  try{
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false })
    return {accessToken, refreshToken}
  }catch(error){
    throw new ApiError(500, "Something went wrong while generating referesh and access token")
  }
}

const userRegister = asyncHandler(async (req, res, next) => {
  // get user details from frontend
  const { fullName, username, email, password } = req.body;

  if (
    [fullName, username, email, password].some((field) => field?.trim() === "")
  ) {
    // console.log("All fields are required", fullName, username, email, password);
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  // check for images, check for avatar
  const avatarLocalPath = req?.files?.avatar[0]?.path;
  const coverImageLocalPath = req?.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(500, "Avatar not uploaded");
  }

  const user = await User.create({
    username,
    email,
    fullName,
    password,
    avatar: avatar?.url || "",
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

const loginUser = asyncHandler(async (req, res, next) => {
  const {username, email, password} = res.body;
  if(!username || !email){
    throw new ApiError(400, "username or email is required");
  }
  const user = await User.findOne({$or: [{username}, {email}]});
  if(!user){
    throw new ApiError(500, "User does not exist");
  }

  const isPasswordValid = user.isPasswordCorrect(password);

  if(!isPasswordValid){
    throw new ApiError(401, "Invalid user credentials");
  }

  const {accessToken,refreshToken} = await generateAccessAndRefereshTokens(user._id);

  const  loggedInUser = await User.findById(user._id).select("-password -refreshToken");

  const options = {
     httpOnly: true,
     secure: true
  }

  return res.status(200).cookie("accessToken",accessToken, options).cookie("refreshToken", refreshToken, options).json(new ApiResponce(200, {user: accessToken,refreshToken, loggedInUser},   "User logged In Successfully"))
  
})


export default userRegister;
