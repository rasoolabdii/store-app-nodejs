const Router = require("express");
const {courseController} = require("./course.controller");
const { uploadFile } = require("../../utils/multer");
const AuthGuard = require("../../middlewares/AuthGuard.middleware");
const router = Router();

router.post("/add" , AuthGuard , uploadFile.single("image") , courseController.addCourse);
router.patch("/update/:id" , AuthGuard , uploadFile.single("image") , courseController.updateCourseById);
router.get("/list" , AuthGuard , courseController.getListOfCourse);
router.get("/list/:id" , AuthGuard , courseController.getCourseById);

module.exports = {
    CourseRoutesApi: router
}