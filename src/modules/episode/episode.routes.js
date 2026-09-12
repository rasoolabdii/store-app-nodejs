const { Router } = require("express");
const AuthGuard = require("../../middlewares/AuthGuard.middleware");
const { uploadVideo } = require("../../utils/multer");
const episodeController = require("./episode.controller");
const router = Router();

router.post(
  "/add",
  AuthGuard,
  uploadVideo.single("video"),
  episodeController.addNewEpisode,
);
router.patch(
  "/update/:episodeId",
  AuthGuard,
  uploadVideo.single("video"),
  episodeController.updateEpisode,
);

router.get("/list", AuthGuard, episodeController.getAllEpisodes);
router.get("/list/:episodeId", AuthGuard, episodeController.getEpisodeById);

router.delete(
  "/remove/:episodeId",
  AuthGuard,
  episodeController.removeEpisodeById,
);

module.exports = {
  EpisodeRoutesApi: router,
};
