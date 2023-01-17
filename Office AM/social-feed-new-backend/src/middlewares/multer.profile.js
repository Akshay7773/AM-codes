const multer = require("multer");
const path = require("path");
let imageUrl = "http://localhost:8080/assets/profile/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const pathName = path.join(__dirname, "../assets/profile");

    cb(null, pathName);
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + "-" + file.originalname;
    req.locals = { image: imageUrl + fileName };
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

// const upload = (key) => (req, res, next) => {
//   const filename = multer({ storage: storage }).single(key);
//   req.filename = filename;
//   return next();
// };

module.exports = upload;

// Multer code
