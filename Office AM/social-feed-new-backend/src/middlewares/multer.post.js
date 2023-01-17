const multer = require("multer");
const path = require("path");
let imageUrl = "http://localhost:8080/assets/posts/";

let imagesArr = [];
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const pathName = path.join(__dirname, "../assets/posts");

    cb(null, pathName);
  },
  filename: (req, file, cb) => {
    // console.log(file, "++++++++++++=")
    const fileName = Date.now() + "-" + file.originalname;
    imagesArr.push(fileName);
    req.locals = imagesArr;
    cb(null, fileName);
    console.log("first");
  },
});

const upload = multer({ storage: storage });

// const upload = (key) => (req, res, next) => {
//   const filename = multer({ storage: storage }).any(key);
//   imagesArr = [];
//   req.filename = filename;
//   return next();
// };

module.exports = upload;
