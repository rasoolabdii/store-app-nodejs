const { Router } = require("express");
const AuthGuard = require("../../middlewares/AuthGuard.middleware");
const roleController = require("./role.controller");
const router = Router();

router.post("/add" , AuthGuard , roleController.createNewRole);
router.patch("/edit/:id" , AuthGuard , roleController.updateRoleById);
router.get("/list" , AuthGuard , roleController.getAllRoles);

module.exports = {
    RoleRoutesApi: router
};