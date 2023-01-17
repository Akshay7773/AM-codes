const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const { commentsService } = require("../services");
const { User } = require("../models");

const getComments = catchAsync(async (req, res) => {
  //   const filter = pick(req.query, ["_id", "caption"]);
  //   const options = pick(req.query, ["limit", "page"]);
  const postId = req.params.postId;
  const result = await commentsService.queryComments(postId);
  res.send(result);
});

const addComment = catchAsync(async (req, res) => {
  const postId = req.params.postId;
  const userId = req.user._id.valueOf();
  const result = await commentsService.addComment(postId, req.body, userId);
  res.status(httpStatus.CREATED).send(result);
});

const likeToComment = catchAsync(async (req, res) => {
  const userId = req.user._id.valueOf();
  const commentId = req.body.commentId;
  const comment = await commentsService.likeToComment(userId, commentId);
  res.send(comment);
});

const replyToComment = catchAsync(async (req, res) => {
  const userId = req.user._id.valueOf();
  const commentId = req.body.commentId;
  const replyText = req.body.replyText;
  const result = await commentsService.replyToComment(
    userId,
    commentId,
    replyText
  );
  res.status(httpStatus.CREATED).send(result);
});

module.exports = {
  getComments,
  addComment,
  likeToComment,
  replyToComment,
};
