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

const allowedOrigins = [
  "http://localhost:5173",
];

if (process.env.CLIENT_URL) {
  allowedOrigins.push(
    process.env.CLIENT_URL
  );
}

// CORS middleware
app.use(
  cors({
    origin: (
      origin,
      callback
    ) => {
      // Allow tools and server-to-server
      // requests without an Origin header
      if (!origin) {
        callback(null, true);
        return;
      }

      if (
        allowedOrigins.includes(origin)
      ) {
        callback(null, true);
        return;
      }

      callback(
        new Error(
          "Origin is not allowed by CORS"
        )
      );
    },
    credentials: true,
  })
);

app.use(express.json());

// Authentication routes
app.use(
  "/api/auth",
  authRoutes
);

// User routes
app.use(
  "/api/user",
  userRoutes
);

// Trip routes
app.use(
  "/api/trips",
  tripRoutes
);

// AI routes
app.use(
  "/api/ai",
  aiRoutes
);

// Weather routes
app.use(
  "/api/weather",
  weatherRoutes
);

// Health-check route
app.get("/", (_req, res) => {
  res.json({
    message:
      "🚀 VoyageAI Backend Running",
  });
});

// MongoDB connection
mongoose
  .connect(
    process.env.MONGO_URI as string
  )
  .then(() => {
    console.log(
      "✅ MongoDB Connected"
    );
  })
  .catch((error) => {
    console.log(
      "❌ MongoDB Connection Failed:",
      error
    );
  });

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `🚀 Server running on port ${PORT}`
  );
});