import express from "express";
import {
  publishAVideo,
  getAllVideos,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
} from "../controllers/video.controllers.js";

import { upload } from "../middlewares/multer.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.route("/publish").post(
  verifyJWT,
  upload.fields([
    {
      name: "videoFile",
      maxCount: 1,
    },
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
  publishAVideo
);

router.route("/").get(verifyJWT, getAllVideos);
router.route("/:videoId").get(verifyJWT, getVideoById);
router
  .route("/update-video/:videoId")
  .patch(verifyJWT, upload.single("thumbnail"), updateVideo);

router.route("/delete/:videoId").delete(verifyJWT, deleteVideo);
router.route("/publish-status/:videoId").patch(verifyJWT, togglePublishStatus);
export default router;
