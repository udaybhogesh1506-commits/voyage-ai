import express from "express";

import {
  saveTrip,
  getTrips,
  getTripById,
  toggleFavoriteTrip,
  deleteTrip,
} from "../controllers/tripController";

import {
  protect,
} from "../middleware/authMiddleware";

const router = express.Router();

router.post(
  "/save",
  protect,
  saveTrip
);

router.get(
  "/",
  protect,
  getTrips
);

router.patch(
  "/:id/favorite",
  protect,
  toggleFavoriteTrip
);

router.get(
  "/:id",
  protect,
  getTripById
);

router.delete(
  "/:id",
  protect,
  deleteTrip
);

export default router;