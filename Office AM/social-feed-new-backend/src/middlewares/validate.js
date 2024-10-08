const Joi = require("joi");
const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const fs = require("fs");
const path = require("path");
const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ["params", "query", "body", "file"]);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: "key" }, abortEarly: false })
    .validate(object);

  if (error) {
    const errorMessage = error.details
      .map((details) => details.message)
      .join(", ");
    // const deletedImagePath = path.join(__dirname, "../assets/post");
    req.file ? fs.unlinkSync(req.file.path) : null;
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }
  Object.assign(req, value);
  return next();
};

module.exports = validate;
