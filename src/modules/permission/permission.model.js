const { default: mongoose, model } = require("mongoose");

const PermissionSchema = new mongoose.Schema({
    name: {type: String , unique: true},
    description: {type: String , default: ""}
} , {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});

const PermissionModel = model("permission" , PermissionSchema);
module.exports = PermissionModel;