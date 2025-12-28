import Portfolio from "../models/Portfolio.model.js";

export const updatePortfolioService = async (userId, data) => {
  const portfolio = await Portfolio.findOne({ userId });

  if (!portfolio) {
    throw new Error("Portfolio not found");
  }

  // Update only fields provided
  Object.keys(data).forEach((key) => {
    portfolio[key] = data[key];
  });

  await portfolio.save();

  return portfolio;
};
