const createHttpError = require("http-errors");
const Joi = require("joi");
const { MongoIDPattern } = require("../../utils/constant");

const AddCategoryValidationSchema = Joi.object({
    title: Joi.string().required().min(3).max(50).error(createHttpError.BadRequest("عنوان دسته بندی صحیح نمی باشد")),
    parent: Joi.string().allow("").regex(MongoIDPattern).error(createHttpError.BadRequest("شناسه والد ارسال شده صحیح نمی باشد"))
});

const UpdateCategoryValidationSchema = Joi.object({
    id: Joi.string().regex(MongoIDPattern).error(createHttpError.BadRequest("لطفا شناسه صحیح وارد نمایید")),
    title: Joi.string().min(3).max(50).error(createHttpError.BadRequest("عنوان دسته بندی حداقل 3 و حداکثر 50 کاراکتر باید باشد"))
});

module.exports = {
    AddCategoryValidationSchema,
    UpdateCategoryValidationSchema
}