import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import characterRouter from "./routes/character";
import dotenv from "dotenv";

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

// MongoDB connection
// mongoose
//   .connect(mongoUri)
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((err) => {
//     console.error("Failed to connect to MongoDB", err);
//   });

// Routes
app.use("/characters", characterRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Running...");
});

app.get("/private", verifyApiKey, (req: Request, res: Response) => {
  res.send("valid key...");
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
