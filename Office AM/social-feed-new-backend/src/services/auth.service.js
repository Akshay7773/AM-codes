const httpStatus = require("http-status");
const bcrypt = require("bcrypt");
const tokenService = require("./token.service");
const userService = require("./user.service");
const Token = require("../models/token.model");
const ApiError = require("../utils/ApiError");
const { tokenTypes } = require("../config/tokens");

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user || user.deleted || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  }
  return await user.populate("_org", "name email");
};

const loginUserWithGoogle = async (email) => {
  const user = await userService.getUserByEmail(email);
  if (!user || user.deleted) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Seems like you are not registered on AM Social Feed, please do register!"
    );
  }
  return user;
};

/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise}
 */
const resetPassword = async (resetPasswordToken, newPassword) => {
  try {
    const resetPasswordTokenDoc = await tokenService.verifyToken(
      resetPasswordToken,
      tokenTypes.RESET_PASSWORD
    );
    const user = await userService.getUserById(resetPasswordTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    const returnedUser = await userService.updateUserById(
      user.id,
      newPassword,
      {
        image: user.image,
      }
    );
    console.log(returnedUser);
    await Token.deleteMany({ user: user.id, type: tokenTypes.RESET_PASSWORD });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password reset failed");
  }
};

const changePassword = async (userId, oldPass, newPass) => {
  // try {
  const user = await userService.getUserById(userId);
  const validPass = await bcrypt.compare(oldPass, user.password);
  if (!validPass) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Current password is incorrect");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPass, salt);
  await userService.updateUserById(
    userId,
    { password: newPass },
    { image: user.image }
  );
  // } catch (error) {
  //   throw new ApiError(httpStatus.UNAUTHORIZED, "Password reset failed");
  // }
};
/**
 * Verify email
 * @param {string} verifyEmailToken
 * @returns {Promise}
 */
const verifyEmail = async (verifyEmailToken) => {
  try {
    const verifyEmailTokenDoc = await tokenService.verifyToken(
      verifyEmailToken,
      tokenTypes.VERIFY_EMAIL
    );
    const user = await userService.getUserById(verifyEmailTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await Token.deleteMany({ user: user.id, type: tokenTypes.VERIFY_EMAIL });
    await userService.updateUserById(user.id, { isEmailVerified: true });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Email verification failed");
  }
};

module.exports = {
  loginUserWithEmailAndPassword,
  loginUserWithGoogle,
  resetPassword,
  verifyEmail,
  changePassword,
};
