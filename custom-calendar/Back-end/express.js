// app.js
import express from "express";
import cors from "cors";
import User from "./mongodb.js";

const app = express();
app.use(express.json());
app.use(cors());

// Define routes
app.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const check = await User.findOne({ email });
    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
    }
  } catch (err) {
    res.json("notexist");
  }
});

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const check = await User.findOne({ email });
    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
      await User.create({ email, password });
    }
  } catch (err) {
    res.json("notexist");
  }
});

export default app;
