const { createProductValidationSchema } = require("./product.validate");
const ProductModel = require("./product.model");
const { ObjectIdValidator } = require("../public.validator.js");
const {
  copyObject,
  deleteInvalidPropertyInObject,
} = require("../../utils/functions");

const {
  ListOfImagesFromRequests,
  setFeatures,
} = require("../../utils/functions");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const Controller = require("../Controller");
const createHttpError = require("http-errors");

const productBlackList = {
  BOOKMARKS: "bookmarks",
  LIKES: "likes",
  DISLIKES: "dislikes",
  COMMENTS: "comments",
  SUPPLIER: "supplier",
  WEIGHT: "weight",
  WIDTH: "width",
  HEIGHT: "height",
  LENGTH: "length",
  COLORS: "colors",
};
Object.freeze(productBlackList);

class ProductController extends Controller {
  constructor() {
    super();
  }

  async addProduct(req, res, next) {
    try {
      const images = ListOfImagesFromRequests(
        req?.files || [],
        req?.body?.fileUploadPath,
      );

      if (req.body.tags && typeof req.body.tags === "string") {
        req.body.tags = req.body.tags.split(",");
      }

      if (req.body.colors && typeof req.body.colors === "string") {
        req.body.colors = req.body.colors.split(",");
      }

      const productBody = await createProductValidationSchema.validateAsync(
        req.body,
      );

      const {
        title,
        short_text,
        text,
        category,
        tags,
        count,
        discount,
        price,
        type,
        format,
      } = productBody;
      const supplier = req.user._id;
      let features = setFeatures(productBody);
      const product = await ProductModel.create({
        title,
        short_text,
        text,
        category,
        tags,
        price,
        discount,
        count,
        images,
        features,
        supplier,
        type,
        format,
      });

      if (!product) {
        throw new createHttpError.BadRequest("محصول مورد نظر ایجاد نشد");
      }

      return res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        data: {
          message: "محصول مورد نظر با موفقیت ایجاد شد",
          product,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await this.findProductById(id);
      let data = copyObject(req.body);
      if (req.body.tags && typeof req.body.tags === "string") {
        req.body.tags = req.body.tags.split(",");
      }

      if (req.body.colors && typeof req.body.colors === "string") {
        req.body.colors = req.body.colors.split(",");
      }
      data.images = ListOfImagesFromRequests(
        req?.files || [],
        req.body.fileUploadPath,
      );
      const productBody = await createProductValidationSchema.validateAsync(
        req.body,
      );
      data.features = setFeatures(productBody);
      let blackListFields = Object.values(productBlackList);
      deleteInvalidPropertyInObject(data, blackListFields);
      const updateProductResult = await ProductModel.updateOne(
        { _id: product._id },
        { $set: data },
      );
      if (updateProductResult.modifiedCount === 0) {
        throw new createHttpError.BadRequest("محصول مورد نظر آپدیت نشد");
      }
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: {
          message: "محصول مورد نظر با موفقیت آپدیت شد",
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async listOfAllProducts(req, res, next) {
    try {
      const search = req?.query?.search || "";
      let products;
      if (search) {
        products = await ProductModel.find(
          {
            $text: {
              $search: new RegExp(search, "ig"),
            },
          },
          { __v: 0 },
        );
        if (!products) {
          throw new createHttpError.NotFound("محصولات مورد نظر یافت نشد");
        }
      } else {
        products = await ProductModel.find({}, { __v: 0 });
      }
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: {
          products,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getProductById(req, res, next) {
    try {
      const { id } = await ObjectIdValidator.validateAsync(req.params);
      const product = await ProductModel.findById({_id: id} , {__v: 0});
      if(!product) {
        throw new createHttpError.NotFound("محصول مورد نظر یافت نشد")
      }
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: {
          product
        }
      })
    }
    catch(error) {
      next(error);
    }
  }

  async findProductById(productId) {
    const { id } = await ObjectIdValidator.validateAsync({ id: productId });
    const products = await ProductModel.findById({ _id: id });
    if (!products) {
      throw new createHttpError.NotFound("محصول مورد نظر یافت نشد");
    }
    return products;
  }
}

module.exports = new ProductController();
