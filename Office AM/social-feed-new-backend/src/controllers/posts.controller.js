const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const { postsService } = require("../services");
const { User } = require("../models");

const getPosts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["_id", "caption"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await postsService.queryPosts(filter, {
    ...options,
    populate: [
      {
        path: "_user",
        select: "_id firstname lastname image email ",
      },
    ],
  });
  res.send(result);
});
const addPost = catchAsync(async (req, res) => {
  // console.log(req.files);
  // console.log(req.locals);
  const images = req.files.map((file) => {
    return file.filename;
  });
  const userId = req.user._id.valueOf();
  const user = await User.findById(userId);
  const post = await postsService.createPost(
    {
      ...req.body,
      images: images,
    },
    userId
  );
  res.status(httpStatus.CREATED).send(post);
});
const likeToPost = catchAsync(async (req, res) => {
  const userId = req.user._id.valueOf();
  const postId = req.body.postId;
  const post = await postsService.likeToPost(userId, postId);
  res.send(post);
});

module.exports = {
  getPosts,
  addPost,
  likeToPost,
};
