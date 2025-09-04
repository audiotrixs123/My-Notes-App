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

// //(Register/Login)

// import express from "express";
// import Note from "../models/Note.js";
// import auth from "../middleware/auth.js";

// const router = express.Router();

// // get user notes
// router.get("/", auth, async (req, res) => {
//   const notes = await Note.find({ userId: req.user.id });
//   res.json(notes);
// });

// // create note
// router.post("/", auth, async (req, res) => {
//   const note = new Note({ text: req.body.text, userId: req.user.id });
//   await note.save();
//   res.json(note);
// });

// // update note
// router.put("/:id", auth, async (req, res) => {
//   const updated = await Note.findOneAndUpdate(
//     { _id: req.params.id, userId: req.user.id },
//     { text: req.body.text },
//     { new: true }
//   );
//   res.json(updated);
// });

// // delete note
// router.delete("/:id", auth, async (req, res) => {
//   await Note.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
//   res.json({ message: "Note deleted" });
// });

// export default router;
