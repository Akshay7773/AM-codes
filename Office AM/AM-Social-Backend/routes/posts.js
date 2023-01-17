const fs = require("fs");
const path = require("path");
const router = require("express").Router();
const Post = require("../models/Post");
const Comment = require("../models/Comments");
const multer = require("multer");
const verify = require("./verifyToken");
const User = require("../models/User");

let fileName;
let imageUrl = "http://localhost:3300/assets/post/";
// Multer code
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const pathName = path.join(__dirname, "../assets/post");
    console.log(pathName);
    cb(null, pathName);
  },
  filename: (req, file, cb) => {
    fileName = Date.now() + "-" + file.originalname;
    console.log(fileName);
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

router.get("/getPost", verify, async (req, res) => {
  const page = req.query.page;
  const itemsPerPage = req.query.limit;
  if (page <= 0)
    return res.status(400).send("Page must be 1 or greater than 1");
  else {
    try {
      const post = await Post.find()
        .skip((page - 1) * itemsPerPage)
        .limit(itemsPerPage);
      const user = await User.findById(req.user._id);
      const updatedPost = post.map((postOne) => {
        return {
          ...postOne._doc,
          image: imageUrl + postOne.image,
          name: user.firstname + " " + user.lastname,
        };
      });
      return res.status(200).json(updatedPost);
    } catch (err) {
      return res.send(`${err}`);
    }
  }
});

router.post(
  "/addPost",
  verify,
  upload.single("image"),
  async (req, res, next) => {
    //   console.log(req.file);
    //   console.log(req.body);
    const post = new Post({
      image: fileName,
      caption: req.body.caption,
      createdBy: req.user._id,
    });

    try {
      const newPost = await post.save();
      res
        .status(200)
        .send({ ...newPost, name: user.firstname + " " + user.lastname });
    } catch (err) {
      const deletedImagePath = path.join(__dirname, "../assets/post");
      fs.unlinkSync(deletedImagePath + fileName);
      res.status(400).send({ message: err });
    }
  }
);

router.put("/likeToPost", verify, async (req, res) => {
  const userId = req.user._id;
  const postId = req.body.postId;
  const post = await Post.findById(postId);
  const likedPost = post.likes.filter((like) => like === userId);
  console.log(likedPost);
  if (likedPost.length > 0) {
    const filteredLikes = post.likes.filter((like) => like != userId);
    const updatedPost = await Post.updateOne(
      { _id: postId },
      { $set: { likes: filteredLikes } }
    );
    const thatPost = await Post.findById(postId);
    console.log(thatPost);
    return res.status(200).send(thatPost);
  } else {
    const addedNewLike = [...post.likes, userId];
    const updatedPost = await Post.updateOne(
      { _id: postId },
      { $set: { likes: addedNewLike } }
    );
    const thatPost = await Post.findById(postId);
    console.log(thatPost);
    return res.status(200).send(thatPost);
  }
});

router.post("/addComment", verify, async (req, res) => {
  const comment = new Comment({
    postId: req.body.postId,
    text: req.body.text,
    createdBy: req.user._id,
  });

  try {
    const newComment = await comment.save();
    res.status(200).send(newComment);
  } catch (err) {
    res.status(400).send(`${err}`);
  }
});

router.get("/getComments", verify, async (req, res) => {
  try {
    const comment = await Comment.find();
    res.status(200).json(comment);
  } catch (err) {
    res.send(`${err}`);
  }
});

router.put("/likeToComment", verify, async (req, res) => {
  const userId = "626bab7be1bdcdccc6dd2f7d";
  const commentId = req.body.commentId;
  const comment = await Comment.findById(commentId);
  const likedComment = comment.likes.filter((like) => like === userId);
  console.log(likedComment);
  if (likedComment.length > 0) {
    const filteredLikes = comment.likes.filter((like) => like != userId);
    const updatedComment = await Comment.updateOne(
      { _id: commentId },
      { $set: { likes: filteredLikes } }
    );
    const thatComment = await Comment.findById(commentId);
    console.log(thatComment);
    return res.status(200).send(updatedComment);
  } else {
    const addedNewLike = [...comment.likes, userId];
    const updatedComment = await Comment.updateOne(
      { _id: commentId },
      { $set: { likes: addedNewLike } }
    );
    const thatComment = await Post.findById(commentId);
    console.log(thatComment);
    return res.status(200).send(updatedComment);
  }
});

module.exports = router;
