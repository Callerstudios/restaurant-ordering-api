import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { db } from "./database/db";
import authRoutes from "./modules/auth/auth.routes";
import { errorHandler } from "./middleware/error-handler";
import restaurantRoutes from "./modules/restaurants/restaurant.routes";
import orderRoutes from "./modules/orders/order.routes"
import { swaggerMiddleware } from "./docs/swagger";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use("/docs", ...swaggerMiddleware);

app.get("/", (_, res) => {
  res.json({
    message: "Restaurant Ordering API",
  });
});
app.get("/health", async (_, res) => {
  try {
    await db.query("SELECT 1");

    res.json({
      status: "ok",
      database: "connected",
    });
  } catch {
    res.status(500).json({
      status: "error",
      database: "disconnected",
    });
  }
});
app.use("/auth", authRoutes);
app.use("/restaurants", restaurantRoutes);
app.use("/orders", orderRoutes);
app.use(errorHandler);

export default app;
