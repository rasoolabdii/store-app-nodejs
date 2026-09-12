const createHttpError = require("http-errors");
const Joi = require("joi");

const getOTPValidationSchema = Joi.object({
    mobile: Joi.string().length(11).pattern(/^09[0-9]{9}$/).required().error(createHttpError.BadRequest("لطفا شماره موبایل معتبر وارد نمایید"))
});

const checkOTPValidationSchema = Joi.object({
    mobile: Joi.string().length(11).required().pattern(/^09[0-9]{9}$/).error(createHttpError.BadRequest("لطفا شماره موبایل معتبر وارد نمایید")),
    code: Joi.string().length(6).required().error(createHttpError.BadRequest("کد تایید به درستی وارد نشده است"))
})

module.exports = {
    getOTPValidationSchema,
    checkOTPValidationSchema
}