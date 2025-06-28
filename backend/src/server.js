// server.js
import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import path from "path";

const app = express();
const PORT = process.env .PORT;
const __dirname = path.resolve();
// Middleware to parse JSON
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,// Allow credentials (cookies) to be sent by frontend
}));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes); 
app.use("/api/chat", chatRoutes);

if (process.env.NODE_ENV === "production") {
  // Serve static files from the React frontend app
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  // Handle React routing, return all requests to React app
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend","dist", "index.html"));
  });
}

// Start server and connect to DB
app.listen(PORT, async () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  await connectDB();  // Connect to PostgreSQL via Prisma
});
