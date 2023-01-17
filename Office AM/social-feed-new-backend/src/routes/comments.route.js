const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const postsController = require("../controllers/posts.controller");
const validate = require("../middlewares/validate");
const postValidation = require("../validations/post.validation");
const upload = require("../middlewares/multer.post");
const { commentsController } = require("../controllers");
const commentsValidation = require("../validations/comments.validation");
// For token validation
router.use(auth());

// Routes: to get, add and update post
router
  .route("/:postId")
  .get(commentsController.getComments)
  .post(validate(commentsValidation.addComment), commentsController.addComment)
  .put(commentsController.likeToComment)
  .patch(commentsController.replyToComment);
//   .post(
//     upload.single("image"),
//     validate(postValidation.createPost),
//     postsController.addPost
//   )
//   .put(postsController.likeToPost);

module.exports = router;
