const path = require("path");
const multer = require("multer");

//Upload file
const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, path.join(__dirname, "../assets"));
  },
  filename: (req, file, cb) => {
    let filetype = file.originalname.split(".").pop();
    let filename =
      Date.now() +
      JSON.stringify(Math.floor(Math.random() * 100)) +
      "." +
      filetype;

    req.user.file = filename;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage }).single("image");
exports.upload = upload;
