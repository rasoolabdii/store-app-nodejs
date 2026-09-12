const { Router } = require("express");
const authController = require("./auth.controller");
const AuthGuard = require("../../middlewares/AuthGuard.middleware");
const router = Router();

router.post("/send-otp" , authController.sendOTP);
router.post("/check-otp" , authController.checkOTP);
router.post("/logout" , AuthGuard , authController.logout);
router.get("/refresh-token" , authController.VerifyRefreshToken);

module.exports = {
    AuthRoutesApi: router
}