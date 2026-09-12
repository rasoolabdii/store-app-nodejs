const { Router } = require("express");
const AuthGuard = require("../../middlewares/AuthGuard.middleware");
const categoryController = require("./category.controller");
const router = Router();

router.post("/add" , AuthGuard , categoryController.addCategory);
router.patch("/edit/:id" , AuthGuard , categoryController.updateCategoryTitle);
router.get("/list" , AuthGuard , categoryController.getAllCategory);
router.get("/list/:id" , AuthGuard , categoryController.getCategoryById);
router.delete("/remove/:id" , AuthGuard , categoryController.removeCategoryById);

module.exports = {
    CategoryRoutesApi: router
}