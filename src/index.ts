// src/index.ts
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routes/meshRoute";

// Enable dotenv if you're using environment variables


const app = express();
const PORT = process.env.PORT || 9000;

app.use(cors()); // Enable CORS with default settings
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/health", async (req, res, next) => {
  try {
    res.send("I am running fine");
  } catch (err) {
    next(err); // Passes the error to the error handling middleware
  }
});
mongoose
  .connect("mongodb://localhost:27017/scenedb")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error:", err));


// Start the server
app.use("/api/mesh",router );
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
