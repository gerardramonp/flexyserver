import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import pubCharacterRoutes from "./routes/characters/public/pubCharacterRoutes";
import priCharacterRoutes from "./routes/characters/private/priCharacterRoutes";
import dotenv from "dotenv";
import userRoutes from "./routes/users/userRoutes";
import authRoutes from "./routes/auth/authRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const mongoUri =
  process.env.MONGODB_URI || "mongodb://localhost:27017/flexyserver";
const apiKey = process.env.API_PRIVATE_KEY;

// Middleware
app.use(express.json());

const verifyApiKey = (req: Request, res: Response, next: NextFunction) => {
  const key = req.headers["x-api-key"];
  if (key && key === apiKey) {
    return next();
  } else {
    return res.status(403).send("Forbidden: Invalid API key");
  }
};

mongoose.set("strictQuery", false);

// MongoDB connection
mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

// Routes

// Public
app.use("/characters", pubCharacterRoutes);
app.use("/auth", authRoutes);

// Private
app.use("/private/characters", verifyApiKey, priCharacterRoutes);
app.use("/private/users", verifyApiKey, userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Running...");
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
