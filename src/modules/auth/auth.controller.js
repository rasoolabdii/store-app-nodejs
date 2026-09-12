const createHttpError = require("http-errors");
const Controller = require("../Controller");
const {StatusCodes: HttpStatus} = require("http-status-codes");
const UserModel = require("./auth.model");
const { RandomNumberGenerator } = require("../../utils/functions");
const { ROLES } = require("../../utils/constant");
const JWT = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { getOTPValidationSchema, checkOTPValidationSchema } = require("./auth.validation");


class AuthController extends Controller {
    constructor() {
        super();
    }

    async sendOTP(req , res , next) {
        try {
            await getOTPValidationSchema.validateAsync(req.body);
            const {mobile} = req.body;
            const code = RandomNumberGenerator();
            const result = await this.saveUser(mobile , code);
            if(!result) {
                throw new createHttpError.Unauthorized("ورود ناموفق")
            }
            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                data: {
                    message: "کد تایید با موفقیت ارسال شد",
                    code,
                    mobile
                }
            })
        }
        catch(error) {
            next(error);
            console.log(error);
        }
    }

    async checkOTP(req , res , next) {
        try {
            const {mobile , code} = req.body;
            await checkOTPValidationSchema.validateAsync(req.body);
            const user = await UserModel.findOne({mobile});
            if(!user) {
                throw createHttpError.NotFound("کاربری با این شماره موبایل یافت نشد")
            };
            if(user?.otp?.code != code ) {
                throw createHttpError.Unauthorized("کد تایید ارسال شده صحیح نمی باشد")
            };
            const now = Date.now();
            if(+user?.otp?.expiresIn < now) {
                throw createHttpError.Unauthorized("کد تایید منقضی شده است")
            }

            const {accessToken , refreshToken} = await this.generateTokens({userId: user?._id});

            const OptionsCookies = {
                httpOnly: true,
                signed: true,
                sameSite: "lax",
                secure: process.env.NODE_ENV === "development" ? false : true,
                domain: process.env.DOMAIN
            }

            res.cookie("accessTokenStore" , accessToken , OptionsCookies);
            res.cookie("refreshTokenStore" , refreshToken , OptionsCookies);

            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    message: " خوش آمدید ورود با موفقیت انجام شد",
                    user,
                    accessToken,
                    refreshToken
                }
            })
        }
        catch(error) {
            next(error);
        }
    }

    async saveUser(mobile , code) {
        let otp = {
            code,
            expiresIn: (new Date().getTime() + 120000)
        }

        const result = await this.checkExistsUser(mobile);
        if(result) {
            return (await this.updateUser(mobile , {otp}));
        }
        return !!(await UserModel.create({
            mobile,
            otp,
            role: ROLES.USER
        }))
    }

    async checkExistsUser(mobile) {
        const user = await UserModel.findOne({ mobile });
        return !!user;
    }

    async updateUser(mobile , objectData = {}) {
        Object.keys(objectData).forEach((key) => {
            if(["" , " " , 0 , "0" , undefined , NaN , null , false].includes(objectData[key])) {
                delete objectData[key];
            }
        })
        const updateResult = await UserModel.updateOne({mobile} , {$set: objectData});
        return !!updateResult.modifiedCount;
    }

    async generateTokens(payload) {
        const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY;
        const REFRESH_TOKEN_SECRET_KEY = process.env.REFRESH_TOKEN_SECRET_KEY;
        const accessToken = JWT.sign(payload , ACCESS_TOKEN_SECRET_KEY , {
            expiresIn: "7d"
        });

        const refreshToken = JWT.sign(payload , REFRESH_TOKEN_SECRET_KEY , {
            expiresIn: "30d"
        });

        return {accessToken , refreshToken}
    }

    async VerifyRefreshToken(req , res , next) {
        try{
            const refreshToken = req.signedCookies["refreshTokenStore"];
            const token = cookieParser.signedCookie(refreshToken , process.env.REFRESH_TOKEN_SECRET_KEY);
            if(!token) {
                throw createHttpError.Unauthorized("لطفا وارد حساب کاربری خود شوید");
            }
            const verified = JWT.verify(token , process.env.REFRESH_TOKEN_SECRET_KEY);
            if(verified?.userId) {
                const user = await UserModel.findById(verified?.userId);
                if(!user) {
                    throw createHttpError.Unauthorized("لطفا وارد حساب کاربری خود شوید")
                };
                const {accessToken , refreshToken} = await this.generateTokens({userId: user?._id});
                return res.json({
                    message: "توکن جدید با موفقیت ایجاد شد",
                    accessToken,
                    refreshToken
                })
            }
        }   
        catch(error) {
            next(error);
        }
    }

    async logout(req , res , next) {
        try {
            const OptionsCookies = {
                httpOnly: true,
                maxAge: 1,
                sameSite: "lax",
                signed: true,
                expires: Date.now(),
                secure: true,
                path: "/",
                domain: process.env.NODE_ENV === "development" ? "localhost" : process.env.DOMAIN
            }
            res.cookie("accessTokenStore" , null , OptionsCookies);
            res.cookie("refreshTokenStore" , null , OptionsCookies);

            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    message: "خروج شما با موفقیت انجام شد"
                }
            })
        }
        catch(error) {
            next(error);
        }
    }

};

module.exports = new AuthController();