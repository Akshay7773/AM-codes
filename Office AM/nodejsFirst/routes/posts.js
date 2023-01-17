const router = require("express").Router();
const verify = require("./verifyToken");
const multer = require("../tools/multer");

const User = require("../models/User");
router.get("/", verify, (req, res) => {
  res.json({
    posts: {
      title: "my first post",
      description: "random data",
    },
  });
});

// add hospital name , location , image, List of doctors, list of diseases
router.post("/add");

// FIND USER BY TOKEN
router.get("/findone", verify, async (req, res) => {
  const user_id = req.user._id;
  const user = await User.findOne({ _id: user_id });
  //   console.log(user);
  res.send(user);
});

router.post("/postimage", [verify, multer.upload], (req, res) => {
  console.log(req.file);
  console.log(__dirname);
});

module.exports = router;
