const createHttpError = require("http-errors");
const Controller = require("../Controller");
const CategoryModel = require("./category.model");
const {StatusCodes: HttpStatus} = require("http-status-codes");
const { AddCategoryValidationSchema, UpdateCategoryValidationSchema } = require("./category.validation");
const { Types } = require("mongoose");


class CategoryController extends Controller {
    constructor() {
        super();
    }

    async addCategory(req , res , next) {
        try {
            const { title , parent } = req.body;
            await AddCategoryValidationSchema.validateAsync(req.body);
            const category = await CategoryModel.create({title , parent});
            if(!category) {
                throw createHttpError.BadRequest("دسته بندی مورد نظر ایجاد نشد . مجدد تلاش کنید")
            };

            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                data: {
                    message: "دسته بندی مورد نظر با موفقیت ایجاد شد"
                }
            })
        }
        catch(error) {
            next(error);
        }
    }

    async updateCategoryTitle(req , res , next) {
        try {
            const {id} = req.params;
            const { title } = req.body;
            await UpdateCategoryValidationSchema.validateAsync(req.body);
            await this.checkExistCategory(id);
            const updateCategory = await CategoryModel.updateOne({_id: id} , {
                $set: {title}
            });
            if(updateCategory.modifiedCount === 0) {
                throw createHttpError.InternalServerError("به روز رسانی انجام نشد")
            };
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    message: "به روز رسانی با موفقیت انجام شد"
                }
            })
        }
        catch(error) {
            next(error);
        }
    }

    async getAllCategory(req , res , next) {
        try {
            // const category = await CategoryModel.aggregate([
            //     {
            //         $match: {
            //             parent: undefined
            //         }
            //     },
            //     {
            //         $lookup: {
            //             from: "categories",
            //             localField: "_id",
            //             foreignField: "parent",
            //             as: "children"
            //         }
            //     },
            //     {
            //         $project: {
            //             __v: 0
            //         }
            //     }
            // ]);

            const category = await CategoryModel.aggregate([
                {
                    $match: {
                        parent: undefined
                    }
                },
                {
                    $graphLookup: {
                        from: "categories",
                        startWith: "$_id",
                        connectFromField: "_id",
                        connectToField: "parent",
                        depthField: "depth",
                        maxDepth: 5,
                        as: "children"
                    }
                },
                {
                    $project: {
                        __v: 0
                    }
                }
            ]);

            // const category = await CategoryModel.find({parent: undefined});

            if(!category) {
                throw createHttpError.NotFound("دسته بندی ایی وجود ندارد")
            }
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    category
                }
            })
        }
        catch(error) {
            next(error);
        }
    }

    async getCategoryById(req, res ,next) {
        try {
            const {id} = req.params;
            const category = await CategoryModel.aggregate([
                {
                    $match: { _id: new Types.ObjectId(id)}
                },
                {
                    $lookup: {
                        from: "categories",
                        localField: "_id",
                        foreignField: "parent",
                        as: "children"
                    }
                },
                {
                    $project: {
                        __v: 0
                    }
                }
            ]);
            if(!category) {
                throw createHttpError.NotFound("دسته بندی مورد نظر با این شناسه یافت نشد")
            };
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    category
                }
            })
        }
        catch(error) {
            next(error);
        }
    }

    async removeCategoryById(req , res , next) {
        try {
            const {id} = req.params;
            const category = await this.checkExistCategory(id);
            const deleteResult = await CategoryModel.deleteMany({
                $or: [
                    {_id: category._id},
                    {parent: category._id}
                ]
            });
            if(deleteResult.modifiedCount === 0) {
                throw createHttpError.InternalServerError("حذف دسته بندی انجام نشد")
            };
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    message: "دسته بندی مورد نظر با موفقیت حذف شد"
                }
            })
        }
        catch(error) {
            next(error);
        }
    }

    async checkExistCategory(id) {
        const category = await CategoryModel.findById(id);
        if(!category) {
            throw createHttpError.NotFound("دسته بندی مورد نظر یافت نشد");
        }
        return category;
    }
};

module.exports = new CategoryController();