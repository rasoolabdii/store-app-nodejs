const createHttpError = require("http-errors");
const UserModel = require("../auth/auth.model");
const Controller = require("../Controller");
const {StatusCodes: HttpStatus} = require("http-status-codes");
const { deleteInvalidPropertyInObject } = require("../../utils/functions");
const { UpdateProfileValidationSchema } = require("./user.validation");

class UserController extends Controller {
    constructor() {
        super();
    }

    async getAllUsers(req , res , next) {
        try {
            const search = req?.query?.search || "";
            let users;
            if(search) {
                users = await UserModel.find({
                    $text: {
                        $search: new RegExp(search , "ig")
                    }
                } , {__v: 0, otp: 0});
                if(!users) {
                    throw createHttpError.NotFound("هیچ کاربری یافت نشد")
                }
            }
            else {
                users = await UserModel.find({} , {__v: 0 , otp: 0});
                if(!users) {
                    throw createHttpError.NotFound("کاربری یافت نشد")
                }
            }
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    users
                }
            })
        }
        catch(error) {
            next(error);
        }
    }

    async updateUserProfile(req , res , next) {
        try {
            const userId = req.user._id;
            const data = req.body;
            await UpdateProfileValidationSchema.validateAsync(data);
            const blackListFields = ["Courses" , "mobile" , "otp" , "bills" , "discount" , "roles"];
            deleteInvalidPropertyInObject(data , blackListFields);
            const updateResult = await UserModel.updateOne({_id: userId} , {
                $set: data
            });
            if(updateResult.modifiedCount === 0) {
                throw createHttpError.InternalServerError("به روز رسانی پروفایل انجام نشد")
            };
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    message: "پروفایل با موفقیت آپدیت شد"
                }
            })
        }
        catch(error) {
            next(error);
        }
    }


    async getUserProfile(req , res , next) {
        try {
            const {_id: userId} = req.user;
            const user = await UserModel.findById(userId , {otp: 0 , __v: 0});
            if(!user) {
                throw createHttpError.NotFound("کاربری یافت نشد")
            };
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    user
                }
            })
        }
        catch(error) {
            next(error);
        }
    }

    async completeProfile(req , res , next) {
        try {
            const user = req.user;
            const {first_name , last_name , email , password , birthday , username} = req.body;
            if(!user.isVerifiedUser) {
                throw createHttpError.BadRequest("لطفا پروفایل خود را تکمیل نمایید")
            }
            const duplicateUser = await UserModel.findOne({email});
            if(duplicateUser) {
                throw createHttpError.BadRequest("کاربری با این ایمیل قبلا ثبت نام کرده است")
            }
            const usernameUser = await UserModel.findOne({username});
            if(usernameUser === username) {
                throw createHttpError.BadRequest("نام کاربری مورد نظر قبلا ثبت شده است")
            }

            const updateUser = await UserModel.updateOne({_id: user._id} , {$set: {
                first_name,
                last_name,
                username,
                email,
                password,
                isVerifiedUser: true
            }});
            
            if(updateUser.modifiedCount === 0) {
                throw createHttpError.BadRequest("آپدیت اطلاعات پروفایل انجام نشد . لطفا مجددا سعی کنید")
            }
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    message: "اطلاعات پروفایل شما با موفقیت تکمیل گردید",
                    updateUser
                }
            })
        }
        catch(error) {
            next(error);
        }
    }

};
module.exports = new UserController();