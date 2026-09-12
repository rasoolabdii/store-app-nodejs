const createHttpError = require("http-errors");
const { AbstractCourseController } = require("../course/course.controller");
const {StatusCodes: HttpStatus} = require("http-status-codes");
const CourseModel = require("../course/course.model");
const { deleteInvalidPropertyInObject } = require("../../utils/functions");


class ChapterController extends AbstractCourseController {
    constructor() {
        super();
    }

    async addChapter(req , res , next) {
        try { 
            const { id , title , text } = req.body;
            await this.findCourseById(id);
            const createResult = await CourseModel.updateOne({_id: id} , {
                $push: {
                    chapters: {
                        title,
                        text,
                        episodes: []
                    }
                }
            });
            if(!createResult) {
                throw new createHttpError.InternalServerError("فصل مورد نظر به دوره افزوده نشد . مجددا تلاش کنید")
            };

            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                data: {
                    message: "فصل مورد نظر با موفقیت به دوره افزوده شد"
                }
            })
        }
        catch(error) {
            next(error);
        }
    };

    async chaptersOfCourseList(req , res , next) {
        try {
            const { id } = req.params;
            const chapter = await this.getChaptersOfCourse(id);

            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    chapter
                }
            })
        }
        catch(error) {
            next(error);
        }
    }

    async updateChapterById(req , res , next) {
        try {
            const { id } = req.params;
            await this.getOneChapter(id);
            const data = req.body;
            deleteInvalidPropertyInObject(data , ["_id"]);
            const updateChapter = await CourseModel.updateOne({"chapters._id": id} , {
                $set: {
                    "chapters.$": data
                }
            });
            if(updateChapter.modifiedCount === 0) {
                throw new createHttpError.InternalServerError("به روز رسانی فصل مورد نظر انجام نشد")
            }
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    message: "فصل مورد نظر با موفقیت به روز رسانی شد"
                }
            })
        }
        catch(error) {
            next(error);
        }
    }

    async getChaptersOfCourse(id) {
        const chapters = await CourseModel.find({_id: id} , {chapters: 1 , title: 1});
        if(!chapters) {
            throw new createHttpError.NotFound("فصل های مورد نظر یافت نشد")
        };
        return chapters;
    }
    
    async getOneChapter(id) {
        const chapter = await CourseModel.find({"chapters._id": id} , {"chapters.$": 1});
        if(!chapter) {
            throw new createHttpError.NotFound("فصل مورد نظر یافت نشد")
        };
        return chapter;
    }

    async removeChapterOfCourseById(req , res , next) {
        try {
            const { id } = req.params;
            await this.getChaptersOfCourse(id);
            const removeResult = await CourseModel.updateOne({"chapters._id": id} , {
                $pull: {
                    chapters: {
                        _id: id
                    }
                }
            });
            if(removeResult.modifiedCount === 0) {
                throw new createHttpError.InternalServerError("حذف فصل مورد نظر انجام نشد")
            };

            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    message: "فصل مورد نظر با موفقیت حذف شد"
                }
            })
        }
        catch(error) {
            next(error);
        }
    }
};

module.exports = new ChapterController();