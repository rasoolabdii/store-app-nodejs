const { Router } = require("express");
const AuthGuard = require("../../middlewares/AuthGuard.middleware");
const userController = require("./user.controller");
const router = Router();

router.get("/list" , AuthGuard , userController.getAllUsers);
router.patch("/update-profile" , AuthGuard , userController.updateUserProfile);
router.get("/profile" , AuthGuard , userController.getUserProfile);
router.patch("/complete-profile" , AuthGuard , userController.completeProfile);

module.exports = {
    UserRoutesApi: router
}