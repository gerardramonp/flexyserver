const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/flexyserver", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

// Routes
const characterRouter = require("./routes/character");
app.use("/characters", characterRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
