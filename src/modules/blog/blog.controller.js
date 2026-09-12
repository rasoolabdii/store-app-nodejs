const createHttpError = require("http-errors");
const Controller = require("../Controller");
const BlogModel = require("./blog.models");
const { createBlogValidationSchema } = require("./blog.validation");
const path = require("path");
const {StatusCodes: HttpStatus} = require("http-status-codes");

class blogController extends Controller {
    constructor() {
        super();
    };

    async createBlog(req , res , next) {
        try {
            const blogData = await createBlogValidationSchema.validateAsync(req.body);
            // const blogData = req.body;
            req.body.image = path.join(blogData.fileUploadPath , blogData.filename);
            let { title , text , short_text , category , tags} = blogData;
            const image = req.body.image;
            const author = req.user._id;
            if(tags && typeof tags === "string") {
                tags = tags.split(",")
            }

            const blog = await BlogModel.create({
                author,
                title,
                text,
                short_text,
                tags,
                image,
                category
            });
            if(!blog) {
                throw createHttpError.BadRequest("بلاگ مورد نظر ایجاد نشد")
            }
            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                data: {
                    message: "بلاگ مورد نظر با موفقیت ایجاد شد"
                }
            })
        }
        catch(error) {
            console.log(error);
            next(error);
        }
    }
};
module.exports = new blogController();