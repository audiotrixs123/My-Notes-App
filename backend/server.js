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

// //(Register/Login)
// import express from "express";
// import cors from "cors";
// import mongoose from "mongoose";
// import notesRoutes from "./routes/notes.js";
// import authRoutes from "./routes/auth.js";

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api/auth", authRoutes);
// app.use("/api/notes", notesRoutes);

// mongoose.connect("mongodb://127.0.0.1:27017/notesapp")
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch(err => console.error(err));

// app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
