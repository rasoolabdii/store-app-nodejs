const { default: mongoose, model } = require("mongoose");
const { CommentSchema } = require("../publicSchema");
const ObjectId = mongoose.Types.ObjectId;

const BlogSchema = new mongoose.Schema({
    author: {type: ObjectId , ref: "user" , required: true},
    title: {type: String , required: true},
    short_text: {type: String , required: true},
    text: {type: String , required: true},
    image: {type: String, required: true},
    tags: {type: [String] , default: []},
    category: {type: [ObjectId] , ref: "category" , required: true},
    comments: {type: [CommentSchema] , default: []},
    likes: {type: [ObjectId] , ref: "user" , default: []},
    dislikes: {type: [ObjectId] , ref: "user" , default: []},
    bookmarks: {type: [ObjectId] , ref: "user" , default: []}
} , {
    timestamps: true,
    versionKey: false,
    toJSON: {
        virtuals: true
    }
});

BlogSchema.virtual("user" , {
    ref: "user",
    localField :"_id",
    foreignField: "author"
});

BlogSchema.virtual("category_detail" , {
    ref: "category",
    localField: "_id",
    foreignField: "category"
});

BlogSchema.virtual("imageUrl").get(function() {
    return `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${this.image}`
});

const BlogModel = model("blog" , BlogSchema);
module.exports = BlogModel;