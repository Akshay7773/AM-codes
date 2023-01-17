const Joi = require("joi");

const addComment = {
  body: Joi.object().keys({
    text: Joi.string().required(),
  }),
};

module.exports = {
  addComment,
};
