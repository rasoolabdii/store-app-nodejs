const { Router } = require("express");
const { AuthRoutesApi } = require("./auth/auth.routes");
const { CategoryRoutesApi } = require("./category/category.routes");
const { UserRoutesApi } = require("./user/user.routes");
const { PermissionRoutesApi } = require("./permission/permission.routes");
const { RoleRoutesApi } = require("./role/role.routes");
const { BlogRoutesApi } = require("./blog/blog.routes");
const { CourseRoutesApi } = require("./course/course.routes");
const { ChapterRoutesApi } = require("./chapter/chapter.routes");
const { EpisodeRoutesApi } = require("./episode/episode.routes");
const { productRutesApi } = require("./product/product.routes");
const router = Router();

router.use("/auth", AuthRoutesApi);
router.use("/category", CategoryRoutesApi);
router.use("/user", UserRoutesApi);
router.use("/permission", PermissionRoutesApi);
router.use("/role", RoleRoutesApi);
router.use("/blog", BlogRoutesApi);
router.use("/course", CourseRoutesApi);
router.use("/chapter", ChapterRoutesApi);
router.use("/episode", EpisodeRoutesApi);
router.use("/product", productRutesApi);

module.exports = {
  mainRouterApi: router,
};
