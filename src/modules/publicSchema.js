const { default: mongoose } = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;


const CommentSchema = new mongoose.Schema({
    user: {type: ObjectId , ref: "user" , required: true},
    comment: {type: String , required: true},
    show: {type: Boolean , required: true , default: false},
    openToComment: {type: Boolean , default: true},
    parent: {type: ObjectId , ref: "comment"}
} , {
    timestamps: true
});

module.exports = {
    CommentSchema
}