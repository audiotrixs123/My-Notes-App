import express from "express";
import Note from "../models/Note.js";  // you need a Note model

const router = express.Router();

// ➤ Get all notes
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ➤ Add note
router.post("/", async (req, res) => {
  try {
    const { text } = req.body;
    const newNote = new Note({ text });
    await newNote.save();
    res.json(newNote);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ➤ Delete note
router.delete("/:id", async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ➤ Update note
router.put("/:id", async (req, res) => {
  try {
    const updated = await Note.findByIdAndUpdate(
      req.params.id,
      { text: req.body.text },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Note not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});
export default router;
