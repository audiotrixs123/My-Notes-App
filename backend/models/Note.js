import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // link note to user
}, { timestamps: true });

export default mongoose.model("Note", noteSchema);
