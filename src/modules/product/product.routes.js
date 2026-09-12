const { Router } = require("express");
const router = Router();
const productController = require("./product.controller");
const AuthGuard = require("../../middlewares/AuthGuard.middleware");
const { uploadFile } = require("../../utils/multer");

router.post(
  "/add",
  AuthGuard,
  uploadFile.array("images"),
  productController.addProduct,
);

router.patch(
  "/update/:id",
  AuthGuard,
  uploadFile.array("images"),
  productController.updateProduct,
);

router.get("/list", AuthGuard, productController.listOfAllProducts);
module.exports = {
  productRutesApi: router,
};

router.get("/list/:id" , AuthGuard , productController.getProductById);
router.delete("/remove/:id" , AuthGuard , productController.removeProductById);
