const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const {
  authService,
  userService,
  tokenService,
  emailService,
} = require("../services");
const { OAuth2Client } = require("google-auth-library");
require("dotenv/config");
const client = new OAuth2Client({
  clientId: `${process.env.GOOGLE_CLIENT_ID}`,
});

const register = catchAsync(async (req, res) => {
  // const org = await userService.createOrg(req.body);
  let user;
  try {
    user = await userService.createUser({
      // _org: org._id,
      ...req.body,
    });
  } catch (e) {
    // await org.remove();
    throw e;
  }
  // user = await user.populate("_org", "name email");
  const { token, expires } = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({
    user,
    token,
    expires,
  });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const { token, expires } = await tokenService.generateAuthTokens(user);
  res.send({
    user,
    token,
    expires,
  });
});

const googleLogin = catchAsync(async (req, res) => {
  const { idToken } = req.body;

  const ticket = await client.verifyIdToken({
    idToken: idToken,
    requiredAudience: `${process.env.GOOGLE_CLIENT_ID}`,
  });

  const payload = ticket.getPayload();

  const user = await authService.loginUserWithGoogle(payload.email);
  const { token, expires } = await tokenService.generateAuthTokens(user);
  res.send({
    user,
    token,
    expires,
  });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(
    req.body.email
  );
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body);
  res.status(httpStatus.NO_CONTENT).send();
});

const changePassword = catchAsync(async (req, res) => {
  await authService.changePassword(
    req.user._id.valueOf(),
    req.body.currentPass,
    req.body.newPass
  );
  res.status(httpStatus.NO_CONTENT).send();
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(
    req.user
  );
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.status(httpStatus.NO_CONTENT).send();
});

const self = catchAsync(async (req, res) => {
  res.send(await req.user.populate("savedPosts"));
});

module.exports = {
  register,
  login,
  googleLogin,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
  self,
  changePassword,
};
