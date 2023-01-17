const Joi = require("@hapi/joi");
var regularExpression =
  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
const stringPassswordError = new Error(
  "Password cannot be empty and  must contain atleast one number and one symbol with minimum 6 characters"
);

const registerValidation = (data) => {
  const schema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string()
      .required()
      .min(6)
      .regex(regularExpression)
      .error(stringPassswordError),
  });
  return schema.validate(data).error;
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });
  return schema.validate(data);
};

const updateValidation = (data) => {
  const schema = Joi.object({
    userName: Joi.string().required(),
    gender: Joi.string().required(),
    email: Joi.string().required().email(),
    bio: Joi.string(),
    dob: Joi.string(),
    mobile: Joi.number(),
    image: Joi.string(),
  });
  return schema.validate(data);
};
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.updateValidation = updateValidation;
