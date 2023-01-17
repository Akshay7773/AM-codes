const fs = require("fs");
const path = require("path");
const router = require("express").Router();
const Image = require("../models/Image");
const multer = require("multer");

let fileName;
// Multer code
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const pathName = path.join(__dirname, "../assets");

    cb(null, pathName);
  },
  filename: (req, file, cb) => {
    fileName = Date.now() + "-" + file.originalname;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

// router.get("/get", (req, res) => {
//   Image.find({}, (err, items) => {
//     if (err) {
//       console.log(err);
//       res.status(500).send("An error occurred", err);
//     } else {
//       res.render("imagesPage", { items: items });
//     }
//   });
// });

router.post("/post", upload.single("image"), (req, res, next) => {
  console.log(req.file);
  console.log(req.body);

  //   var obj = {

  //     img: {
  //       data: fs.readFileSync(
  //         path.join(__dirname + "/uploads/" + req.file.filename)
  //       ),
  //       contentType: "image/png",
  //     },
  //   };
  //   Image.create(obj, (err, item) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       // item.save();
  //       res.redirect("/");
  //     }
  //   });
});
module.exports = router;
