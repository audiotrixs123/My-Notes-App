// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";

// import authRoutes from "./routes/auth.js";   // ✅ Correct import

// dotenv.config();

// const app = express();   // ✅ must come before app.use()

// app.use(cors());         // ✅ now this works
// app.use(express.json()); // ✅ Needed for req.body

// // Routes
// app.use("/api/auth", authRoutes);

// app.get("/", (req, res) => {
//   res.send("✅ API is running...");
// });

// const PORT = process.env.PORT || 5000;

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("✅ MongoDB Connected");  // 👈 you will see this now
//     app.listen(PORT, () => 
//       console.log(`🚀 Server running on http://localhost:${PORT}`)
//     );
//   })
//   .catch(err => console.error("❌ MongoDB connection error:", err));

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";   // ✅ Import routes
import notesRoutes from "./routes/notes.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);   // ✅ Register routes
app.use("/api/notes", notesRoutes);

app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("❌ DB Error:", err));
