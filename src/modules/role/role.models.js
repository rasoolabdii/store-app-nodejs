const { default: mongoose, model } = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const RoleSchema = new mongoose.Schema({
    title: {type: String , unique: true},
    description: {type: String , default: ""},
    permissions: {type: [ObjectId] , ref: "permission" , default: []}
} , {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});

// RoleSchema.virtual("children" , {
//     ref: "role",
//     localField: "_id",
//     foreignField: "permissions"
// });

// function autoPopulate(next) {
//     this.populate([{path: "children" , select: {__v: 0}}])
//     next();
// };

// RoleSchema.pre("find" , autoPopulate);
// RoleSchema.pre("findOne" , autoPopulate);

const RoleModel = model("role" , RoleSchema);
module.exports = RoleModel;