const createHttpError = require("http-errors");
const Controller = require("../Controller");
const RoleModel = require("./role.models");
const { createRoleValidation, UpdateRoleValidation } = require("./role.validation");
const {StatusCodes: HttpStatus} = require("http-status-codes");
const { default: mongoose } = require("mongoose");
const { copyObject, deleteInvalidPropertyInObject } = require("../../utils/functions");

class RoleController extends Controller {
    constructor() {
        super();
    }

    async createNewRole(req , res , next) {
        try {
            let {title , description, permissions} = req.body;
            if(permissions) {
                permissions = permissions.split(",")
            }
            await createRoleValidation.validateAsync(req.body);
            await this.findRoleWithTitle(title);
            const role = await RoleModel.create({ title , description , permissions});
            if(!role) {
                throw createHttpError.BadRequest("نقش مورد نظر ایجاد نشد")
            }
            return  res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                data: {
                    message: "نقش مورد نظر با موفقیت ایجاد شد"
                }
            })
        }
        catch(error) {
            next(error);
        }
    }

    async updateRoleById(req , res, next) {
        try {
            const {id} = req.params;
            const roleId = await this.findRoleWithIdOrTitle(id);
            await UpdateRoleValidation.validateAsync(req.body);
            const data = copyObject(req.body);
            if(data.permissions) {
                data.permissions = data.permissions.split(",");
            }
            deleteInvalidPropertyInObject(data , []);
            const updateResult = await RoleModel.updateOne({_id: roleId._id} , {
                $set: data
            });
            if(updateResult.matchedCount === 0) {
                throw createHttpError.BadRequest("ویرایش نقش مورد نظر انجام نشد")
            }
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    message: "نقش مورد نظر با موفقیت ویرایش شد"
                }
            })
        }
        catch(error) {
            next(error);
        }
    }
    
    async getAllRoles(req , res , next) {
        try {
            const role = await RoleModel.find({} , {__v: 0}).populate([{ path: "permissions" , select: {name: 1 , description: 1} }]);
            if(!role) {
                throw createHttpError.BadRequest("هیچ نقشی یافت نشد")
            }
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    role
                }
            })
        }
        catch(error) {
            console.log(error);
            next(error);
        }
    }

    async findRoleWithIdOrTitle(field) {
        let findQuery;
        if(mongoose.isValidObjectId(field)) {
            findQuery = {_id: field}
        }
        else {
            findQuery = {title: field}
        }
        const role = await RoleModel.findOne(findQuery);
        if(!role) {
            throw createHttpError.NotFound("نقش مورد نظر یافت نشد")
        }
        return role;
    }

    async findRoleWithTitle(title) {
        const role = await RoleModel.findOne({title});
        if(role) {
            throw createHttpError.BadRequest("نقش مورد نظر قبلا ثبت شده است")
        }
    }
};
module.exports = new RoleController();