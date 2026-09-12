const createHttpError = require("http-errors");
const Controller = require("../Controller");
const PermissionModel = require("./permission.model");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const { AddNewPermissionValidationSchema, UpdatePermissionValidationSchema } = require("./permission.validation");
const { copyObject, deleteInvalidPropertyInObject } = require("../../utils/functions");

class PermissionController extends Controller {
    constructor() {
        super();
    }

    async addNewPermission(req, res, next) {
        try {
            const { name, description } = await AddNewPermissionValidationSchema.validateAsync(req.body);
            await this.findPermissionWithName(name);
            const permission = await PermissionModel.create({ name, description });
            if (!permission) {
                throw createHttpError.InternalServerError("سطح دسترسی مورد نظر ایجا نشد")
            }
            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                data: {
                    message: "سطح دسترسی با موفقیت ایجاد شد"
                }
            })
        }
        catch (error) {
            next(error);
        }
    }

    async updatePermissionById(req, res, next) {
        try {
            const { id } = req.params;
            await this.findPermissionWithId(id);
            await UpdatePermissionValidationSchema.validateAsync(req.body);
            const data = copyObject(req.body);
            deleteInvalidPropertyInObject(data, []);
            const updateResult = await PermissionModel.updateOne({ _id: id }, {
                $set: data
            });
            if (updateResult.modifiedCount === 0) {
                throw createHttpError.BadRequest("سطح دسترسی مورد نظر به روز رسانی نشد")
            };
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    message: "سطح دسترسی مورد نظر با موفقیت آپدیت شد"
                }
            })
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }

    async getAllPermissions(req, res, next) {
        try {
            const permissions = await PermissionModel.find({}, { __v: 0 });
            if (!permissions) {
                throw createHttpError.BadRequest("هیچ سطح دسترسی ایی یافت نشد")
            };
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    permissions
                }
            })
        }
        catch (error) {
            next(error);
        }
    }

    async removePermissionById(req, res, next) {
        try {
            const { id } = req.params;
            await this.findPermissionWithId(id);
            const removeResult = await PermissionModel.deleteOne({ _id: id });
            if (!removeResult) {
                throw createHttpError.BadRequest("سطح دسترسی با این شناسه حذف نشد")
            }
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    message: "سطح دسترسی مورد نظر با موفقیت حذف شد"
                }
            })
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }

    async findPermissionWithName(name) {
        const permission = await PermissionModel.findOne({ name });
        if (permission) {
            throw createHttpError.BadRequest("سطح دسترسی مورد نظر قبلا ثبت شده است")
        }
    }

    async findPermissionWithId(id) {
        const permission = await PermissionModel.findById(id);
        if (!permission) {
            throw createHttpError.BadRequest("سطح دسترسی با این شناسه یافت نشد");
        }
        return permission;
    }
};

module.exports = new PermissionController();