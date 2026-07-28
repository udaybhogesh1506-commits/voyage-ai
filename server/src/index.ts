import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import tripRoutes from "./routes/tripRoutes";
import aiRoutes from "./routes/aiRoutes";
import weatherRoutes from "./routes/weatherRoutes";

dotenv.config();

const app = express();

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// Routes

// Authentication
app.use("/api/auth", authRoutes);

// User
app.use("/api/user", userRoutes);

// Trips
app.use("/api/trips", tripRoutes);

// AI Generator
app.use("/api/ai", aiRoutes);

// Weather
app.use("/api/weather", weatherRoutes);

// Test API
app.get("/", (req, res) => {
  res.json({
    message: "🚀 VoyageAI Backend Running",
  });
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((error) => {
    console.log(
      "❌ MongoDB Connection Failed:",
      error
    );
  });

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `🚀 Server running on http://localhost:${PORT}`
  );
});