const Controller = require("../Controller");
const { createEpisodeSchema } = require("./episode.validation");
const path = require("path");
// const { getTime } = require("../../utils/functions");
const CourseModel = require("../course/course.model");
const createHttpError = require("http-errors");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const { config } = require("dotenv");
const { default: getVideoDurationInSeconds } = require("get-video-duration");
config();
const fs = require("fs");
const mongoose = require("mongoose");
const {
  copyObject,
  getTime,
  deleteInvalidPropertyInObject,
} = require("../../utils/functions");

class EpisodeController extends Controller {
  constructor() {
    super();
  }

  async addNewEpisode(req, res, next) {
    try {
      // Validate request body
      const validationEpisode = await createEpisodeSchema.validateAsync(
        req.body,
      );

      const {
        title,
        text,
        type,
        chapterId,
        courseId,
        filename,
        fileUploadPath,
      } = validationEpisode;

      // مسیر نسبی ویدیو برای ذخیره در دیتابیس
      const videoAddress = path
        .join("public", fileUploadPath, filename)
        .replace(/\\/g, "/");

      console.log("videoAddress:", videoAddress);

      // مسیر کامل فایل روی سرور
      const videoPath = path.resolve(videoAddress);
      console.log("videoPath:", videoPath);

      // گرفتن مدت زمان ویدیو
      const seconds = await getVideoDurationInSeconds(videoPath);
      console.log("seconds:", seconds);

      if (!Number.isFinite(seconds)) {
        throw new createHttpError.InternalServerError(
          "مدت زمان ویدیو قابل تشخیص نیست",
        );
      }

      // تبدیل ثانیه به فرمت موردنظر
      const time = getTime(seconds);

      console.log("time:", time);

      // اطلاعات اپیزود
      const episode = {
        title,
        text,
        type,
        time,
        videoAddress,
      };

      // ذخیره اپیزود در دوره
      const createEpisodeResult = await CourseModel.updateOne(
        {
          _id: courseId,
          "chapters._id": chapterId,
        },
        {
          $push: {
            "chapters.$.episodes": episode,
          },
        },
      );
      console.log("file exists:", fs.existsSync(videoPath));

      if (createEpisodeResult.modifiedCount === 0) {
        throw new createHttpError.InternalServerError(
          "اپیزود (درس) مورد نظر ایجاد نشد",
        );
      }

      return res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        data: {
          message: "اپیزود (درس) مورد نظر با موفقیت ایجاد شد",
        },
      });
    } catch (error) {
      console.log("addNewEpisode error:", error);
      next(error);
    }
  }

  async updateEpisode(req, res, next) {
    try {
      const episodeId = req.params.episodeId;
      if (!mongoose.Types.ObjectId.isValid(episodeId)) {
        throw new createHttpError.BadRequest("شناسه اپیزود نامعتبر است");
      }

      const episode = await this.getOneEpisode(episodeId);
      const { fileUploadPath, filename } = req.body;
      let blackListFields = ["_id"];
      if (fileUploadPath && filename) {
        //مسیر نسبی ویدیو برای دخیره در دیتابیس
        const videoAddress = path
          .join("public", fileUploadPath, filename)
          .replace(/\\/g, "/");
        console.log("videoAddress", videoAddress);

        //مسیر کامل ویدیو روی سرور
        const videoPath = path.resolve(videoAddress);
        console.log("videoPath", videoPath);

        const seconds = await getVideoDurationInSeconds(videoPath);
        req.body.time = getTime(seconds);
        console.log("fileUploadPath", fileUploadPath);
        console.log("filename", filename);

        blackListFields.push(fileUploadPath);
        blackListFields.push(filename);
      } else {
        blackListFields.push("videoAddress");
        blackListFields.push("time");
      }
      const data = req.body;
      deleteInvalidPropertyInObject(data, blackListFields);
      const newEpisode = {
        ...episode,
        ...data,
      };

      const updateEpisodeResult = await CourseModel.updateOne(
        {
          "chapters.episodes._id": episodeId,
        },
        {
          $set: {
            "chapters.$[chapter].episodes.$[episode]": newEpisode,
          },
        },
        {
          arrayFilters: [
            {
              "chapter.episodes._id": episodeId,
            },
            {
              "episode._id": episodeId,
            },
          ],
        },
      );

      if (!updateEpisodeResult.modifiedCount) {
        throw new createHttpError.InternalServerError(
          "ویرایش اپیزود مورد نظر انجام نشد",
        );
      }

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: {
          message: "اپیزود مورد نظر با موفقیت آپدیت شد",
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getOneEpisode(episodeId) {
    const course = await CourseModel.findOne(
      {
        "chapters.episodes._id": episodeId,
      },
      {
        chapters: 1,
      },
    ).lean();

    if (!course) {
      throw new createHttpError.NotFound(
        "اپیزودی (درسی) با این شناسه یافت نشد",
      );
    }

    let episode = null;

    for (const chapter of course.chapters || []) {
      const foundEpisode = chapter.episodes?.find(
        (item) => item._id.toString() === episodeId.toString(),
      );

      if (foundEpisode) {
        episode = foundEpisode;
        break;
      }
    }

    if (!episode) {
      throw new createHttpError.NotFound(
        "اپیزودی (درسی) با این شناسه یافت نشد",
      );
    }

    return copyObject(episode);
  }

  async removeEpisodeById(req, res, next) {
    try {
      const episodeId = req.params.episodeId;
      if (!mongoose.Types.ObjectId.isValid(episodeId)) {
        throw new createHttpError.BadRequest(
          "شناسه اپیزود (درس) صحیح نمی باشد",
        );
      }

      await this.getOneEpisode(episodeId);
      const removeEpisodeResult = await CourseModel.updateOne(
        { "chapters.episodes._id": episodeId },
        {
          $pull: {
            "chapters.$.episodes": {
              _id: episodeId,
            },
          },
        },
      );
      if (removeEpisodeResult.modifiedCount === 0) {
        throw new createHttpError.InternalServerError(
          "اپیزود مورد نظر حذف نشد",
        );
      }

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: {
          message: "اپیزود مورد نظر با موفقیت حذف شد",
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllEpisodes(req, res, next) {
    try {
      const { _id: userId } = req.user;
      const episodes = await CourseModel.aggregate([
        { $unwind: "$chapters" },
        { $unwind: "$chapters.episodes" },
        {
          $replaceRoot: {
            newRoot: "$chapters.episodes",
          },
        },
      ]);
      if (!episodes) {
        throw new createHttpError.InternalServerError(
          "هیچ اپیزو (درسی) یافت نشد",
        );
      }

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: {
          episodes,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getEpisodeById(req, res, next) {
    try {
      const episodeId = req.params.episodeId;
      if (!mongoose.Types.ObjectId.isValid(episodeId)) {
        throw new createHttpError.InternalServerError(
          "شناسه مورد نظر صحیح نمی باشد",
        );
      }
      const course = await CourseModel.findOne(
        { "chapters.episodes._id": episodeId },
        {
          chapters: 1,
        },
      ).lean();

      if (!course) {
        throw new createHttpError.BadRequest("درسی با این شناسه یافت نشد");
      }

      let episode = null;

      for (const chapter of course.chapters || []) {
        const foundEpisode = chapter.episodes?.find(
          (item) => item._id.toString() === episodeId.toString(),
        );

        if (foundEpisode) {
          episode = foundEpisode;
          break;
        }
      }

      if (!episode) {
        throw new createHttpError.InternalServerError(
          "اپیزودی با این شناسه یافت نشد",
        );
      }

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: {
          episode,
        },
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = new EpisodeController();
