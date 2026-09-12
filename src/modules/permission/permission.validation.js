const createHttpError = require("http-errors");
const Joi = require("joi");

const AddNewPermissionValidationSchema = Joi.object({
    name: Joi.string().required().min(3).max(20).error(createHttpError.BadRequest("نام (سطح دسترسی) حداقل 3 و حداکثر 20 کاراکتر باید باشد")),
    description: Joi.string().allow("").min(3).max(50).error(createHttpError.BadRequest("توضیحات (سطح دسترسی) باید حداقل 3 و حداکثر 50 کاراکتر باشد"))
});

const UpdatePermissionValidationSchema = Joi.object({
    name: Joi.string().allow("").min(3).max(20).error(createHttpError.BadRequest("نام (سطح دسترسی) حداقل 3 و حداکثر 20 کاراکتر باید باشد")),
    description: Joi.string().allow("").min(3).max(50).error(createHttpError.BadRequest("توضیحات (سطح دسترسی) حداقل 3 و حداکثر 50 کاراکتر باید باشد"))
})

module.exports = {
    AddNewPermissionValidationSchema,
    UpdatePermissionValidationSchema
}