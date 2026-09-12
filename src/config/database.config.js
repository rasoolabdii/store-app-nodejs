const { default: mongoose } = require("mongoose");
const {config} = require("dotenv");
config();

mongoose.connect(process.env.DB_URI).then(() => {
    console.log("connected to DB Successfully")
}).catch((error) => {
    console.log("can not connect to database" , error?.message);
})