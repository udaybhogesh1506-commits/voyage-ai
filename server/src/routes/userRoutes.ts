import express from "express";

import { protect } from "../middleware/authMiddleware";
import { getUser } from "../controllers/userController";


const router = express.Router();



router.get(
    "/profile",
    protect,
    getUser
);



export default router;