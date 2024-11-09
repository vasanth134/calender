// db.js
import mongoose from "mongoose";

// MongoDB connection
mongoose.connect("mongodb+srv://vasanth:vasanth04@calendar.qa214.mongodb.net/?retryWrites=true&w=majority&appName=Calendar")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("MongoDB connection failed:", err);
  });

// Schema and Model
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
