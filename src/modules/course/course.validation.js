const createHttpError = require("http-errors");
const Joi = require("joi");
const { MongoIDPattern } = require("../../utils/constant");

const createCourseValidationSchema = Joi.object({
    title: Joi.string().min(3).max(40).error(createHttpError.BadRequest("عنوان دوره حداقل 3 و حداکثر 40 کاراکتر باید باشد")),
    text: Joi.string().min(3).max(100).error(createHttpError.BadRequest("متن حداقل 3 و حداکثر 50 کاراکتر باید باشد")),
    short_text: Joi.string().min(3).max(50).error(createHttpError.BadRequest("متن کوتاه حداقل 3 و حداکثر 50 کاراکتر باید باشد")),
    tags: Joi.array().items(Joi.string()).max(40).error(createHttpError.BadRequest("لطفا تگ را وارد نمایید و حداکثر 20 آیتم میتواند باشد")),
    category: Joi.string().regex(MongoIDPattern).error(createHttpError.BadRequest("لطفا دسته بندی را وارد نمایید")),
    price: Joi.number().min(3).max(12).allow("").error(createHttpError.BadRequest("قیمت دوره حداقل 3 رقم و حداکثر 12 رقم باید باشد")),
    discount: Joi.number().min(3).max(10).allow().error(createHttpError.BadRequest("تخفیف دوره حداقل 3 رقم و حداکثر 10 رقم باید باشد")),
    type: Joi.string().regex(/(free , cash , special)/i).error(createHttpError.BadRequest("لطفا نوع دوره را وارد نمایید")),
    status: Joi.string().regex(/(notStarted|Holding|Completed)/i).error(createHttpError.BadRequest("لطفا وضعیت دوره را وارد نمایید")),
    filename: Joi.string().allow().regex(/(\.png|\.jpg|\.jpeg|\.png|\.webp)$/).error(createHttpError.BadRequest("فرمت تصویر ارسالی صحیح نمی باشد")),
    fileUploadPath: Joi.string().allow().error(createHttpError.BadRequest("لطفا فایل خود را انتخاب نمایید"))
});

const updateCourseValidationSchema = Joi.object({
    title: Joi.string().min(3).max(40).error(createHttpError.BadRequest("عنوان درس حداقل 3 و حداکثر 40 کاراکتر میتواند باشد")),
    text: Joi.string().allow().min(3).max(100).error(createHttpError.BadRequest("توضیحات درس حداقل 3 و حداکثر 100 کاراکتر میتواند باشد")),
    short_text: Joi.string().allow().min(3).max(50).error(createHttpError.BadRequest("متن کوتاه درس حداقل 3 و حداکثر 50 کاراکتر میتواند باشد")),
    tags: Joi.array().items(Joi.string()).max(40).allow().error(createHttpError.BadRequest("تگ میتواند حداکثر 40 کاراکتر باشد")),
    category: Joi.string().allow().regex(MongoIDPattern).error(createHttpError.BadRequest("لطفا دسته بندی را وارد نمایید")),
    price: Joi.number().allow().min(3).max(12).error(createHttpError.BadRequest("هزینه دروه حداقل 3 و حداکثر 12 عدد میتواند باشد")),
    discount: Joi.number().min(3).max(10).allow().error(createHttpError.BadRequest("تخفیف دوره حداقل 3 و حداکثر 10 عدد میتواند باشد")),
    type: Joi.string().regex(/(free , cash , special)/i).error(createHttpError.BadRequest("لطفا نوع دوره را وارد نمایید")),
    status: Joi.string().regex(/(notStarted , Holding , Completed)/i).error(createHttpError.BadRequest("وضعیت دوره را وارد نمایید")),
    filename: Joi.string().allow().regex(/(\.png|\.jpg|\.jpeg|\.png|\.webp)$/).error(createHttpError.BadRequest("فرمت تصویر صحیح نیست")),
    fileUploadPath: Joi.string().allow().error(createHttpError.BadRequest("لطفا فایل خود را وارد نمایید"))
})

module.exports = {
    createCourseValidationSchema,
    updateCourseValidationSchema
}