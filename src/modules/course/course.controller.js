const Controller = require("../Controller");
const createHttpError = require("http-errors");
const path = require("path");
const CourseModel = require("./course.model");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const { createCourseValidationSchema, updateCourseValidationSchema } = require("./course.validation");
const { default: mongoose } = require("mongoose");
const { copyObject, deleteInvalidPropertyInObject, deleteFileInPublic, getTimeOfCourse } = require("../../utils/functions");

class CourseController extends Controller {
    constructor() {
        super();
    };

    async addCourse(req, res, next) {
        try {
            const courseSchema = await createCourseValidationSchema.validateAsync(req.body);
            const { fileUploadPath, filename } = courseSchema;
            const teacher = req?.user?._id;
            if (!fileUploadPath || !filename) {
                throw createHttpError.BadRequest("تصویر پروفایل را آپلود کنید")
            }

            const fileName = path.join(fileUploadPath, filename);
            const image = fileName.replace(/\\/g, "/");

            let { title, text, short_text, tags, type, category, price, discount, status } = courseSchema;
            if (Number(price) > 0 && type === "free") {
                throw createHttpError.BadRequest("برای دوره رایگان نمی توان قیمت تعیین کرد")
            };

            if (tags && typeof tags === "string") {
                tags = tags.split(",");
            };
            console.log(tags)
            console.log(price);
            const createCourse = await CourseModel.create({
                title,
                text,
                short_text,
                tags,
                category,
                price,
                discount,
                type,
                image,
                status,
                teacher
            });

            if (!createCourse._id) {
                throw createHttpError.BadRequest("دوره مورد نظر ثبت نشد.مجددا تلاش کنید")
            };

            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                data: {
                    message: "دوره مورد نظر با موفقیت ثبت شد"
                }
            })
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }


    async updateCourseById(req, res, next) {
        try {
            const { id } = req.params;
            const courseSchema = await updateCourseValidationSchema.validateAsync(req.body);
            const course = await this.findCourseById(id);
            const data = copyObject(req.body);
            const { fileUploadPath, filename } = req.body;
            let blackListFields = ["time", "chapters", "episodes", "comments", "students", "bookmarks", "likes", "dislikes"];
            deleteInvalidPropertyInObject(data, blackListFields);
            if (req.file) {
                data.image = path.join(fileUploadPath, filename);
                deleteFileInPublic(course.image);
            }
            const updateResult = await CourseModel.updateOne({ _id: id }, { $set: data });
            if (updateResult.modifiedCount === 0) {
                throw createHttpError.BadRequest("دوره مورد نظر آپدیت نشد . مجددا امتحان کنید")
            };

            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    message: "دوره با موفقیت آپدیت شد"
                }
            })
        }
        catch (error) {
            next(error);
        }
    }

    async findCourseById(id) {
        const course = await CourseModel.findById(id);
        if (!mongoose.isValidObjectId(id)) {
            throw createHttpError.BadRequest("شناسه ارسال شده صحیح نمی باشد")
        }
        if (!course) {
            throw createHttpError.NotFound("دوره مورد نظر یافت نشد")
        };
        return course;
    }

    async getListOfCourse(req , res , next) {
        try {
            const search = req.query?.search;
            let dbQuery = {};
            let courses;

            if(search) {
                const searchTerm = new RegExp(search , "ig");
                dbQuery["$or"] = [
                    {title: searchTerm},
                    {text: searchTerm},
                    {short_text: searchTerm},
                    {tags: searchTerm}
                ]
            };

            if(search) {
                courses = await CourseModel.find(dbQuery , {__v: 0}).sort({_id: 1}).populate([
                    {path: "category" , select:{children: 0 , parent: 0}},
                    {path: "teacher" , select: {first_name: 1 , last_name: 1 , mobile: 1 , email: 1}}
                ]);
            }
            else {
                courses = await CourseModel.find({} , {__v: 0}).sort({_id: 1}).populate([
                    {path: "category" , select: {title: 1}},
                    {path: "teacher" , select: {first_name: 1 , last_name: 1 , mobile: 1 , email: 1}}
                ])
            }

            if(!courses) {
                throw new createHttpError.NotFound("متاسفانه هیچ محصولی یافت نشد")
            };

            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    courses
                }
            })
        }
        catch(error) {
            next(error)
        }
    }

    async getCourseById(req , res , next) {
        try {
            const { id } = req.params;
            const course = await CourseModel.findById(id , {__v: 0});
            course.time = getTimeOfCourse(course?.chapters);
            if(!course) {
                throw new createHttpError.NotFound("متاسفانه دوره ایی یافت نشد")
            };

            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    course
                }
            })
        }
        catch(error) {
            next(error);
        }
    }

};

module.exports = {
    AbstractCourseController: CourseController,
    courseController : new CourseController()
}