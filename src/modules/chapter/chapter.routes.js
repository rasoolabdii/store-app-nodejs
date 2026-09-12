const { Router } = require("express");
const AuthGuard = require("../../middlewares/AuthGuard.middleware");
const chapterController = require("./chapter.controller");
const router = Router();

router.post("/add" , AuthGuard , chapterController.addChapter);
router.patch("/update/:id" , AuthGuard , chapterController.updateChapterById);
router.get("/list/:id" , AuthGuard , chapterController.chaptersOfCourseList);
router.delete("/remove/:id" , AuthGuard , chapterController.removeChapterOfCourseById);

module.exports = {
    ChapterRoutesApi: router
}