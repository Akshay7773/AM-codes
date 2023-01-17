const express = require("express");
const router = express.Router();
const { registerValidation, loginValidation } = require("../validation");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
router.get("/specific", (req, res) => {
  res.send("we are on specific");
});

// SUBMITS A POST IN MONGODB
router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // CHECKING IF USER ALREADY PRESENT IN DATABASE
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  // CREATING NEW USER ACCOUNT
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    contact: req.body.contact,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // CHECKING IF EMAIL IS EXISTS
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email not found");

  // PASSWORD IS CORRECT
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) res.status(400).send("Incorrect password");

  // create and assign a token

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
  // res.send({ user: user._id, token: "akshay" });
});

// ******************************************** 
// *******UNUSED CODE JUST FOR LEARNING********
// ********************************************
// // GETS BACK ALL THE POSTS
// router.get("/getall", async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (err) {
//     res.json(err);
//   }
// });

// // GET SPECIFIC POST BY USING ID
// router.get("/:userId", async (req, res) => {
//   try {
//     const user = await User.findById(req.params.userId);
//     res.json(user);
//   } catch (err) {
//     res.json({ message: err });
//   }
// });

// // DELETE SINGLE POST BY USING ID
// router.delete("/:userId", async (req, res) => {
//   try {
//     const removedUser = await User.remove({ _id: req.params.userId });
//     res.json(removedUser);
//   } catch (err) {
//     res.json({ message: err });
//   }
// });

// // UPDATE A POST
// router.patch("/:userId", async (req, res) => {
//   try {
//     const updatedUser = await User.updateOne(
//       { _id: req.params.userId },
//       { $set: req.body }
//     );
//     res.json(updatedUser);
//   } catch (err) {
//     res.json({ message: err });
//   }
// });
module.exports = router;
