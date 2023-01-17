const fs = require("fs");
const path = require("path");
const router = require("express").Router();
const User = require("../models/User");
const multer = require("multer");
const { updateValidation } = require("../validation");
const verify = require("./verifyToken");

let fileName;
let imageUrl = "http://localhost:3300/assets/profile/";
// Multer code
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const pathName = path.join(__dirname, "../assets/profile");
    console.log(pathName);
    cb(null, pathName);
  },
  filename: (req, file, cb) => {
    fileName = Date.now() + "-" + file.originalname;
    console.log(fileName);
    // if(fileName === undefined )
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

router.get("/getProfile", verify, async (req, res) => {
  try {
    const userData = await User.findById(req.user._id);
    res.status(200).json(userData);
  } catch (err) {
    res.send(err);
  }
});

router.patch(
  "/update",
  verify,
  upload.single("image"),
  async (req, res, next) => {
    console.log(req.file, "gs");
    // Checking if entries are valid
    const { error } = updateValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Checking if user exits

    const users = await User.find();
    // console.log(users);
    const filteredUsers = users.filter((user) => req.user._id != user._id);
    console.log(filteredUsers);
    const emailExists = filteredUsers.filter(
      (user) => user.email == req.body.email
    );
    console.log(emailExists);
    if (emailExists.length > 0)
      return res.status(400).send("Email already exists!");

    try {
      const updatedUser = await User.updateOne(
        { _id: req.user._id },
        {
          $set: {
            bio: req.body.bio,
            gender: req.body.gender,
            image: fileName,
            userName: req.body.userName,
            dob: req.body.dob,
            email: req.body.email,
            mobile: req.body.mobile,
          },
        }
      );
      return res.status(200).send(updatedUser);
    } catch (err) {
      //   const deletedImagePath = path.join(__dirname, "../assets/profile");
      //   fs.unlinkSync(deletedImagePath + fileName);
      res.status(400).send({ message: err });
    }
  }
);

module.exports = router;
