const Joi = require("joi");
const { MongoIDPattern } = require("../../utils/constant");
const createHttpError = require("http-errors");

const createRoleValidation = Joi.object({
    title: Joi.string().required().min(3).max(50).error(createHttpError.BadRequest("عنوان نقش حداقل 3 و حداکثر 50 کاراکتر باید باشد")),
    description: Joi.string().allow("").min(3).max(60).error(createHttpError.BadRequest("توضیحات نقش حداقل 3 و حداکثر 60 کاراکتر باید باشد")),
    permissions: Joi.string().required().error(createHttpError.BadRequest("لطفا سطح دسترسی معتبر وارد نمایید"))
});

const UpdateRoleValidation = Joi.object({
    title: Joi.string().allow("").min(3).max(50).error(createHttpError.BadRequest("عنوان نقش حداقل 3 و حداکثر 50 کاراکتر باید باشد")),
    description: Joi.string().allow("").min(3).max(60).error(createHttpError.BadRequest("توضیحات نقش حداقل 3  حداکثر 60 کاراکتر باید باشد")),
    permissions: Joi.string().allow("").error(createHttpError.BadRequest("لطفا سطح دسترسی معتبر وارد نمایید"))
});

module.exports = {
    createRoleValidation,
    UpdateRoleValidation
}