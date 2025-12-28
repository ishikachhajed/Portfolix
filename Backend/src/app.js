import express from "express";
import authRoutes from "./routes/auth.routes.js";
import portfolioRoutes from "./routes/portfolio.routes.js";

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/portfolio", portfolioRoutes);

app.get("/", (req, res) => {
  res.send("Portfolix backend is running 🚀");
});

export default app;
