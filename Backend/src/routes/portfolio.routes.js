import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { getMyPortfolio, updatePortfolio } from "../controllers/portfolio.controller.js";


const router = express.Router();

router.get("/me", authMiddleware, getMyPortfolio);
router.put("/me", authMiddleware, updatePortfolio);

export default router;
