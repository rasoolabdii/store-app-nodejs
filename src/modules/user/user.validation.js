const createHttpError = require("http-errors");
const Joi = require("joi");

const UpdateProfileValidationSchema = Joi.object({
    first_name: Joi.string().min(3).max(50).error(createHttpError.BadRequest("نام کاربر حداقل 3 و حداکثر 50 کاراکتر باید باشد")),
    last_name: Joi.string().min(3).max(60).error(createHttpError.BadRequest("نام خانوادگی کاربر حداقل 3 و کداکثر 60 کاراکتر باید باشد")),
    email: Joi.string().email().error(createHttpError.BadRequest("لطفا ایمیل معتبر وارد نمایید")),
    username: Joi.string().min(3).max(50).error(createHttpError.BadRequest("نام کاربری حداقل 3 و حداکثر 50 کاراکتر باید باشد"))
});

module.exports = {
    UpdateProfileValidationSchema
}