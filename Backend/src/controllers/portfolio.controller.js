import Portfolio from "../models/Portfolio.model.js";
import { updatePortfolioService } from "../services/portfolio.service.js";

/* ================= GET MY PORTFOLIO ================= */

export const getMyPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ userId: req.user._id });

    if (!portfolio) {
      return res.status(404).json({ error: "Portfolio not found" });
    }

    res.status(200).json(portfolio);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

/* ================= UPDATE PORTFOLIO ================= */

export const updatePortfolio = async (req, res) => {
  try {
    const updatedPortfolio = await updatePortfolioService(
      req.user._id,   // from JWT middleware
      req.body
    );

    res.json({
      message: "Portfolio updated successfully",
      portfolio: updatedPortfolio,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
