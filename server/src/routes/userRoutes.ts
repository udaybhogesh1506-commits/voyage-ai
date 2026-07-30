import express from "express";

import {
  protect,
} from "../middleware/authMiddleware";

import {
  getUser,
  updateUser,
} from "../controllers/userController";

const router =
  express.Router();

// Get logged-in user profile
router.get(
  "/profile",
  protect,
  getUser
);

// Update logged-in user profile
router.patch(
  "/profile",
  protect,
  updateUser
);

export default router;