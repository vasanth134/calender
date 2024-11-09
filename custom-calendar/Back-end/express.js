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
    const user = await User.findOne({ email });

    if (!user) {
      // If no user is found with the email
      res.json("notexist");
    } else if (user.password !== password) {
      // If email exists but password is incorrect
      res.json("incorrect password");
    } else {
      // If both email and password are correct
      res.json("exist");
    }
  } catch (err) {
    console.log("Error during login:", err);
    res.status(500).json("Error occurred");
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
    console.log("Error during signup:", err);
    res.status(500).json("Error occurred");
  }
});

export default app;
