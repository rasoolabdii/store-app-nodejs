const { default: mongoose, model } = require("mongoose");
const { CommentSchema } = require("../publicSchema");
const ObjectId = mongoose.Types.ObjectId;

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    short_text: { type: String, required: true },
    text: { type: String, required: true },
    tags: { type: [String], required: true },
    category: { type: ObjectId, ref: "category", required: true },
    comments: { type: [CommentSchema], default: [] },
    likes: { type: [ObjectId], default: [] },
    disLikes: { type: [ObjectId], default: [] },
    bookmarks: { type: [ObjectId], default: [] },
    price: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
    type: { type: String },
    format: { type: String, required: false },
    supplier: { type: ObjectId, ref: "user", required: true },
    features: {
      type: Object,
      default: {
        length: "",
        height: "",
        width: "",
        weight: "",
        colors: [],
        model: [],
        madein: "",
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtual: true,
    },
  },
);

ProductSchema.index({ title: "text", short_text: "text", text: "text" });

ProductSchema.virtual("imagesURL").get(function () {
  return this.images.map(
    (image) =>
      `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${image}`,
  );
});

const ProductModel = model("product", ProductSchema);
module.exports = ProductModel;
