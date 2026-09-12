const { default: mongoose, model } = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const ProductSchema = new mongoose.Schema({
    productID: {type: ObjectId , ref: "product"},
    count: {type: Number , default: 1}
});

const CourseSchema = new mongoose.Schema({
    courseID: {type: ObjectId , ref: "course"},
    count: {type: Number , default: 1}
})

const BasketSchema = new mongoose.Schema({
    products: {type: [ProductSchema] , default: []},
    courses: {type: [CourseSchema] , default: []}
});

const OTPSchema = new mongoose.Schema({
    code: {type: String , required: false , default: undefined},
    expiresIn: {type: Number , required: false , default: 0}
});

const UserSchema = new mongoose.Schema({
    first_name: {type: String , required: false},
    last_name: {type: String , required: false},
    username: {type: String , required: false},
    email: {type: String , required: false},
    mobile: {type: String , required: true},
    otp: {type: OTPSchema , required: true},
    password: {type: String , required: false},
    bills: {type: [] , default: []},
    discount: {type: Number , default: 0},
    birthday: {type: String},
    token: {type: String , default: ""},
    role: {type: String , default: "USER"},
    isVerifiedUser: {type: Boolean , required: true , default: false},
    Courses: {type: [ObjectId] , ref: "course" , default: []},
    Products: {type: [ObjectId] , ref: "product" , def: []},
    basket: {type: BasketSchema}
} , {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});

UserSchema.index({first_name: "text" , last_name: "text" , mobile: "text" , username: "text" , email: "text"})

const UserModel = model("user" , UserSchema);
module.exports = UserModel;