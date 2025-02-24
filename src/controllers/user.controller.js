import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js"
import { ApiResponse } from '../utils/ApiResponse.js'
import admin from "../services/firebase.admin.js";

// For generate the token
const generateAccessAndRefereshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while generating referesh and access token"
        );
    }
};

const socialAuth = asyncHandler(async (req, res) => {
    const { idToken, role } = req.body;
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { email, name, picture } = decodedToken;
    const user = await User.findOne({ email });


    const accessTokenOptions = {
        httpOnly: true,
        // secure: true, // Set to true in production for HTTPS
        maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days in milliseconds
        // sameSite: "none",
    };
    const refreshTokenOptions = {
        httpOnly: true,
        // secure: true, // Set to true in production for HTTPS
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        // sameSite: "none",
    };

    if (!user) {
        const newUser = await User.create({
            email,
            name,
            profilePic: picture,
            interests: []
        });
        const { refreshToken, accessToken } = generateAccessAndRefereshTokens(
            newUser._id
        );
        return res
            .status(200)
            .cookie("accessToken", accessToken, accessTokenOptions)
            .cookie("refreshToken", refreshToken, refreshTokenOptions)
            .json(new ApiResponse(200, newUser, "User Signed Up successfully"));
    } else {
        const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
            user._id
        );

        return res
            .status(200)
            .cookie("accessToken", accessToken, accessTokenOptions)
            .cookie("refreshToken", refreshToken, refreshTokenOptions)
            .json(new ApiResponse(200, user, "User logged in successfully"));
    }
});

const getMe = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select(
        "-verifyCode -verifyCodeExpiry -__v"
      );

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    res
        .status(200)
        .json(new ApiResponse(200, user, "User data fetched successfully"));
});

const updateInterests = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (!user) {
        throw new ApiError(404, "User not found");
    }
    const { interests } = req.body;
    user.interests = interests;
    await user.save();

    res
        .status(200)
        .json(new ApiResponse(200, user, "Interests updated successfully"));
})

export { socialAuth, getMe, updateInterests }