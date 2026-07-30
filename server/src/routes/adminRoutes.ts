import {
  Router,
} from "express";

import {
  protect,
} from "../middleware/authMiddleware";

import {
  adminOnly,
} from "../middleware/adminMiddleware";

import {
  getAdminDashboard,
} from "../controllers/adminController";

const router = Router();

router.get(
  "/dashboard",
  protect,
  adminOnly,
  getAdminDashboard
);

export default router;