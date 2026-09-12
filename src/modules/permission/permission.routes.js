const { Router } = require("express");
const AuthGuard = require("../../middlewares/AuthGuard.middleware");
const permissionController = require("./permission.controller");
const router = Router();

router.post("/add" , AuthGuard , permissionController.addNewPermission);
router.patch("/update/:id" , AuthGuard , permissionController.updatePermissionById);
router.get("/list" , AuthGuard , permissionController.getAllPermissions);
router.delete("/remove/:id" , AuthGuard , permissionController.removePermissionById);

module.exports = {
    PermissionRoutesApi: router
}