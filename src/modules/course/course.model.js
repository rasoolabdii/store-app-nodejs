const { default: mongoose, model } = require("mongoose");
const { CommentSchema } = require("../publicSchema");
const { getTimeOfCourse } = require("../../utils/functions");
const ObjectId = mongoose.Types.ObjectId;

const EpisodesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    type: { type: String, default: "unlock" },
    time: { type: String, required: true, default: "00:00:00" },
    videoAddress: { type: String, required: true },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

const ChapterSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, default: "" },
  episodes: { type: [EpisodesSchema], default: [] },
});

const CourseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    short_text: { type: String, required: true },
    image: { type: String, required: true },
    tags: { type: [String], default: [] },
    category: { type: ObjectId, ref: "category", required: true },
    comments: { type: [CommentSchema], default: [] },
    likes: { type: [ObjectId], default: [] },
    dislikes: { type: [ObjectId], default: [] },
    bookmarks: { type: [ObjectId], default: [] },
    price: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    type: {
      type: String,
      default: "free" /*free , cash , special */,
      required: true,
    },
    status: {
      type: String,
      default: "notStarted" /*notStarted , Holding , Completed */,
      required: true,
    },
    teacher: { type: ObjectId, ref: "user", required: true },
    chapters: { type: [ChapterSchema], default: [] },
    students: { type: [ObjectId], default: [], ref: "user" },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

EpisodesSchema.virtual("videoURL").get(function () {
  return `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${this.videoAddress}`;
});

CourseSchema.index({
  title: "text",
  text: "text",
  short_text: "text",
  tags: "text",
});

CourseSchema.virtual("imageURL").get(function () {
  return `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${this.image}`;
});

CourseSchema.virtual("totalTimeVideos").get(function () {
  //create total time video
  return getTimeOfCourse(this.chapters || []);
});

const CourseModel = model("course", CourseSchema);
module.exports = CourseModel;
