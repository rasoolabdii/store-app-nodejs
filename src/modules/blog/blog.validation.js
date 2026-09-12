const createHttpError = require("http-errors");
const Joi = require("joi");
const { MongoIDPattern } = require("../../utils/constant");

const createBlogValidationSchema = Joi.object({
    title: Joi.string().min(3).max(30).error(createHttpError.BadRequest("عنوان دسته بندی حداقل3 و حداکثر30 کاراکتر باید باشد")),
    text: Joi.string().error(createHttpError.BadRequest("لطفا متن را وارد نمایید")),
    short_text: Joi.string().error(createHttpError.BadRequest("متن کوتاه ارسال شده صحیح نمی باشد")),
    tags: Joi.array().items(Joi.string()).min(0).max(20).allow("").error(createHttpError.BadRequest("برچسب ها بیشتر از 20 آیتم نمی تواند باشد")),
    category: Joi.string().pattern(MongoIDPattern).error(createHttpError.BadRequest("دسته مورد نظر یافت نشد")),
    fileUploadPath: Joi.string().allow().error(createHttpError.BadRequest("لطفا تصویر مورد نظر خود را وارد کنید")),
    filename: Joi.string().pattern(/(\.png|\.jpg|\.jpeg|\.webp)$/).error(createHttpError.BadRequest("تصویر ارسالی صحیح نمی باشد"))
});

module.exports = {
    createBlogValidationSchema
}