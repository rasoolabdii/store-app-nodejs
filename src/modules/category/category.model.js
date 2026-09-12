const { default: mongoose, model } = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const CategorySchema = new mongoose.Schema({
    title: {type: String , required: true},
    parent: {type: ObjectId , default: undefined , required: false}
} , {
    timestamps: true,
    id: false,
    versionKey: false,
    toJSON: {
        virtuals: true
    }
});

CategorySchema.virtual("children" , {
    ref: "category",
    localField: "_id",
    foreignField: "parent"
});


function autoPopulate(next) {
    this.populate([{path: "children" , select: {__v: 0} }]);
    next();
}

CategorySchema.pre("find" , autoPopulate);
CategorySchema.pre("findOne" , autoPopulate);

// CategorySchema.pre("findOne" , function(next) {
//     this.populate([{path: "children" , select: {__v: 0} }]);
//     next();
// });

const CategoryModel = model("category" , CategorySchema);
module.exports = CategoryModel;