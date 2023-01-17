const httpStatus = require("http-status");
const { Post } = require("../models");
const ApiError = require("../utils/ApiError");

const queryPosts = async (filter, options) => {
  const posts = await Post.paginate(filter, options);
  return posts;
};

const createPost = async (postBody, userId) => {
  if (postBody.images === undefined) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Image is required");
    
  }
  return Post.create({ ...postBody, _user: userId });
};

const likeToPost = async (userId, postId) => {
  if (!postId) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Post id is required");
  }
  const post = await Post.findById(postId);
  const likedPost = post.likes.filter((like) => like === userId);

  if (likedPost.length > 0) {
    const filteredLikes = post.likes.filter((like) => like != userId);
    //  const updatedPost = await Post.updateOne(
    //    { _id: postId },
    //    { $set: { likes: filteredLikes } }
    //  );
    Object.assign(post, { likes: filteredLikes });
    await post.save();
    return post;
    //  const thatPost = await Post.findById(postId);

    //  return res.status(200).send(thatPost);
  } else {
    const addedNewLike = [...post.likes, userId];
    //  const updatedPost = await Post.updateOne(
    //    { _id: postId },
    //    { $set: { likes: addedNewLike } }
    //  );
    //  const thatPost = await Post.findById(postId);

    //  return res.status(200).send(thatPost);

    Object.assign(post, { likes: addedNewLike });
    await post.save();
    return post;
  }
};

module.exports = {
  queryPosts,
  createPost,
  likeToPost,
};
