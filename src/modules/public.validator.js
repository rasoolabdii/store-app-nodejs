const Joi = require("joi");
const { MongoIDPattern } = require("../utils/constant");
const createHttpError = require("http-errors");

const ObjectIdValidator = Joi.object({
  id: Joi.string()
    .regex(MongoIDPattern)
    .error(createHttpError.BadRequest("شناسه وارد شده صحیح نمی باشد")),
});

module.exports = {
  ObjectIdValidator,
};
