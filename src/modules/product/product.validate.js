const Joi = require("joi");
const createHttpError = require("http-errors");
const { MongoIDPattern } = require("../../utils/constant");

const createProductValidationSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(50)
    .error(createHttpError.BadRequest("عنوان محصول صحیح نمی باشد")),
  text: Joi.string()
    .min(3)
    .error(
      createHttpError.BadRequest(
        "متن ارسالی در مورد محصول به درستی وارد نشده است",
      ),
    ),
  short_text: Joi.string()
    .min(3)
    .max(40)
    .error(createHttpError.BadRequest("متن کوتاه ارسالی صحیح نمی باشد")),
  tags: Joi.array()
    .min(0)
    .max(20)
    .error((errors) => {
      return createHttpError.BadRequest(
        "برچسب ها بیشتر از 20 آیتم نمی توانند باشند",
      );
    }),
  colors: Joi.array()
    .items(
      Joi.string().valid(
        "black",
        "white",
        "gray",
        "red",
        "blue",
        "green",
        "pink",
        "orange",
      ),
    )
    .allow()
    .min(0)
    .max(20)
    .error((errors) => {
      return createHttpError.BadRequest("رنگ انتخاب شده صحیح نمی باشد");
    }),
  format: Joi.string()
    .min(1)
    .max(20)
    .error(
      createHttpError.BadRequest("لطفا فرمت معتبر محصول خود را وارد نمایید"),
    ),
  category: Joi.string()
    .regex(MongoIDPattern)
    .error(createHttpError.BadRequest("دسته بندی مورد نظر صحیح نمی باشد")),
  price: Joi.number().error(
    createHttpError.BadRequest("قیمت وارد شده صحیح نمی باشد"),
  ),
  discount: Joi.number().error(
    createHttpError.BadRequest("تخفیف وارد شده صحیح نمی باشد"),
  ),
  count: Joi.number().error(
    createHttpError.BadRequest("تعداد محصولات وارد شده صحیح نمی باشد"),
  ),
  weight: Joi.number()
    .allow(null, 1, "1")
    .error(createHttpError.BadRequest("ورن محصول وارد شده صحیح نمی باشد")),
  length: Joi.number()
    .allow(null, 1, "1")
    .error(createHttpError.BadRequest("طول محصول وارد  شده صحیح نمی باشد")),
  height: Joi.number()
    .allow(null, 1, "1")
    .error(createHttpError.BadRequest("ارتفاع محصول وارد شده صحیح نمی باشد")),
  width: Joi.number()
    .allow(null, 1, "1")
    .error(createHttpError.BadRequest("عرض محصول وارد شده صحیح نمی باشد")),
  type: Joi.string().regex(/(virtual|physical)/i),
  filename: Joi.string()
    .regex(/(\.png|\.jpg|\.jpeg|\.webp)$/)
    .error(createHttpError.BadRequest("تصویر ارسالی صحیح نمی باشد")),
  fileUploadPath: Joi.allow(),
});

module.exports = {
  createProductValidationSchema,
};
