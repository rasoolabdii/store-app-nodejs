const { Router } = require("express");
const AuthGuard = require("../../middlewares/AuthGuard.middleware");
const blogController = require("./blog.controller");
const { uploadFile } = require("../../utils/multer");
const router = Router();

router.post("/add" , AuthGuard , uploadFile.single("image") , blogController.createBlog);

module.exports = {
    BlogRoutesApi: router
}