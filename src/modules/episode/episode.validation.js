const createHttpError = require("http-errors");
const Joi = require("joi");
const { MongoIDPattern } = require("../../utils/constant");

const createEpisodeSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(50)
    .error(
      createHttpError.BadRequest(
        "عنوان اپیزود حداقل 3 و حداکثر 50 کاراکتر میتواند باشد",
      ),
    ),
  text: Joi.string().error(
    createHttpError.BadRequest("لطفا متن اپیزود را وارد نمایید"),
  ),
  type: Joi.string().regex(/(lock|unlock)/i),
  chapterId: Joi.string()
    .regex(MongoIDPattern)
    .error(createHttpError.BadRequest("شناسه فصل مورد نظر صحیح نمی باشد")),
  courseId: Joi.string()
    .regex(MongoIDPattern)
    .error(createHttpError.BadRequest("شناسه دوره صحیح نمی باشد")),
  filename: Joi.string()
    .regex(/(\.mp4|\.mpg|\.mov|\.avi|\.mkv|\.mpeg)$/)
    .error(createHttpError.BadRequest("فرمت ارسالی فیلم صحیح نمی باشد")),
  fileUploadPath: Joi.allow(),
});

module.exports = {
  createEpisodeSchema,
};
