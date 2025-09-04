import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();

    res.json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;

// //(Register/Login)
// import express from "express";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import User from "../models/User.js";
// import authMiddleware from "../middleware/auth.js"; // ✅ protect routes

// const router = express.Router();

// // Register
// router.post("/register", async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     const existingUser = await User.findOne({ username });
//     if (existingUser) return res.status(400).json({ error: "Username already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = new User({ username, password: hashedPassword });
//     await user.save();

//     // ✅ Generate token
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

//     res.json({
//       message: "User registered successfully",
//       user: { _id: user._id, username: user.username },
//       token
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error during registration" });
//   }
// });

// // Login
// router.post("/login", async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     const user = await User.findOne({ username });
//     if (!user) return res.status(400).json({ error: "Invalid credentials" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

//     // ✅ Generate token
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

//     res.json({
//       message: "Login successful",
//       user: { _id: user._id, username: user.username },
//       token
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error during login" });
//   }
// });


// // ✅ Delete user (must be logged in)
// router.delete("/delete", authMiddleware, async (req, res) => {
//   try {
//     await User.findByIdAndDelete(req.user.id);
//     res.json({ message: "User deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: "Server error during deletion" });
//   }
// });

// export default router;
