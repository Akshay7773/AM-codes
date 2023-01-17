const router = require("express").Router();
const User = require("../models/User");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcrypt");
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const verify = require("./verifyToken");

require("dotenv/config");

const client = new OAuth2Client({
  clientId: `${process.env.GOOGLE_CLIENT_ID}`,
});

router.post("/register", async (req, res) => {
  // Checking if entries are valid
  const error = registerValidation(req.body);
  if (error) return res.status(400).send(error.message);

  // Checking if user exits
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) return res.status(400).send("User already exists!");

  // If no errors then hashing password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Creating new user
  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: hashedPassword,
    userName: req.body.userName,
    image: req.body.image,
    bio: req.body.bio,
    gender: req.body.gender,
    dob: req.body.dob,
    mobile: req.body.mobile,
  });

  try {
    const newUser = await user.save();
    res.status(200).send(newUser);
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

router.post("/login", async (req, res) => {
  // Checking if entries are valid
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Checking if email is found in db
  const userExists = await User.findOne({ email: req.body.email });
  if (!userExists) return res.status(400).send("User not found!");

  const validPass = await bcrypt.compare(
    req.body.password,
    userExists.password
  );
  if (!validPass) return res.status(400).send("Invalid password");

  // If everything is right then creating a token
  const token = jwt.sign(
    { _id: userExists._id, email: userExists.email },
    process.env.TOKEN_SECRET,
    {
      expiresIn: "24h",
    }
  );
  return res
    .header("authorization", token)
    .status(200)
    .send({ token: token, name: userExists.firstname });
});

router.post("/auth/google", async (req, res) => {
  const { idToken } = req.body;

  const ticket = await client.verifyIdToken({
    idToken: idToken,
    requiredAudience: `${process.env.GOOGLE_CLIENT_ID}`,
  });

  const payload = ticket.getPayload();

  try {
    let user = await User.findOne({ email: payload.email });
    if (!user) {
      return res.status(400).send({
        Error: true,
        message: "User not registered! Please sign up to continue",
      });
    } else {
      const token = jwt.sign(
        { _id: user._id, email: user.email },
        process.env.TOKEN_SECRET,
        {
          expiresIn: "24h",
        }
      );
      return res.status(200).json({
        Error: false,
        message: "",
        user: { ...payload, token: token },
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(401).send(` ${err}`);
  }
});

router.put("/updatePassword", verify, async (req, res) => {
  try {
    const userId = req.user._id;
    const userData = await User.findById(userId);

    const validPass = await bcrypt.compare(
      req.body.currentPassword,
      userData.password
    );
    if (!validPass)
      return res.status(400).send("Current password doesn't match");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);

    const updatedUserData = await User.updateOne(
      { _id: userId },
      { $set: { password: hashedPassword } }
    );
    res.status(200).send("Password updated successfully!");
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

router.get("/logout", verify, async (req, res, next) => {
  // const token = req.headers["auth-token"];
  // console.log(token);
  // try {
  //   jwt.sign(token, { expiresIn: 1 }, (logout, err) => {
  //     if (logout) {
  //       res.send({ msg: "You have been Logged Out" });
  //     } else {
  //       res.send({ msg: "Error" });
  //     }
  //   });

  //   res.status(200).send("logout successfully");
  // } catch (err) {
  //   res.json({ message: "nothing happens" });
  // }
  res.status(200).send("Logout successfull!");
});

module.exports = router;
