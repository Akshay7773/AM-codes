const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const postsController = require("../controllers/posts.controller");
const validate = require("../middlewares/validate");
const postValidation = require("../validations/post.validation");
const upload = require("../middlewares/multer.post");

// For token validation
router.use(auth());

// Routes: to get, add and update post
router
  .route("/")
  .get(postsController.getPosts)
  .post(
    upload.array("image"),
    validate(postValidation.createPost),
    postsController.addPost
  )
  .put(postsController.likeToPost);

module.exports = router;
