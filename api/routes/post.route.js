import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  updatePost,
  getPosts,
  getposts,
} from "../controllers/post.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createPost);
router.delete("/delete/:postId", verifyToken, deletePost);
router.post("/update/:id", verifyToken, updatePost);
router.get("/get/:postId", getPost);
router.get("/get", getPosts);
router.get("/getposts", getposts);

export default router;
