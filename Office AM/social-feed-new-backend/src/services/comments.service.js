const httpStatus = require("http-status");
const { Comments } = require("../models");
const ApiError = require("../utils/ApiError");

const queryComments = async (postId) => {
  const posts = await Comments.find({
    postId: postId,
  })
    .populate({
      path: "_user",
      select: "_id firstname lastname email image",
    })
    .populate({
      path: "replies",
      populate: [
        {
          path: "_user",
          select: "_id firstname lastname email image",
        },
      ],
    });
  return posts;
};

const addComment = async (postId, commentBody, userId) => {
  return Comments.create({ ...commentBody, postId: postId, _user: userId });
};

const likeToComment = async (userId, commentId) => {
  if (!commentId) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Comment id is required");
  }
  const comment = await Comments.findById(commentId);
  const likedComment = comment.likes.filter((like) => like === userId);

  if (likedComment.length > 0) {
    const filteredLikes = comment.likes.filter((like) => like != userId);
    //  const updatedPost = await Post.updateOne(
    //    { _id: postId },
    //    { $set: { likes: filteredLikes } }
    //  );
    Object.assign(comment, { likes: filteredLikes });
    await comment.save();
    return comment;
    //  const thatPost = await Post.findById(postId);

    //  return res.status(200).send(thatPost);
  } else {
    const addedNewLike = [...comment.likes, userId];
    //  const updatedPost = await Post.updateOne(
    //    { _id: postId },
    //    { $set: { likes: addedNewLike } }
    //  );
    //  const thatPost = await Post.findById(postId);

    //  return res.status(200).send(thatPost);

    Object.assign(comment, { likes: addedNewLike });
    await comment.save();
    return comment;
  }
};

const replyToComment = async (userId, commentId, replyText) => {
  if (!commentId) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Comment id is required");
  }
  const comment = await Comments.findById(commentId);
  const reply = [...comment.replies, { replyText: replyText, _user: userId }];

  Object.assign(comment, { replies: reply });
  await comment.save();
  return comment;
};

http: module.exports = {
  queryComments,
  addComment,
  likeToComment,
  replyToComment,
};
