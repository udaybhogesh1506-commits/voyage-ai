import express from "express";

import {
  generateItinerary,
  generatePackingList,
  generateHotels,
  generateGuide,
  generateBudget,
} from "../controllers/aiController";

import {
  protect,
} from "../middleware/authMiddleware";

const router = express.Router();

router.post(
  "/generate",
  protect,
  generateItinerary
);

router.post(
  "/packing-list",
  protect,
  generatePackingList
);

router.post(
  "/hotels",
  protect,
  generateHotels
);

router.post(
  "/local-guide",
  protect,
  generateGuide
);

router.post(
  "/budget-estimate",
  protect,
  generateBudget
);

export default router;