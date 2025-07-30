import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/connectDB.js";
const path=require("path");
import userRouter from "./routes/userRoutes.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));

app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../client/build")));
app.get("*", (req, res) => {
  res.sendFile(
    path.resolve(__dirname, "../client/build", "index.html")
  );
});

app.use("/api/auth", userRouter);
app.use("/api/user", userRouter); 

app.get("/api/test", (req, res) => {
  res.json({ message: "CORS is working ✅" });
});

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
});
