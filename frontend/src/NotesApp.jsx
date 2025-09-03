import React, { useEffect, useState } from "react";
import API from "./api";

export default function NotesApp() {
  const [notes, setNotes] = useState([]);
  const [newText, setNewText] = useState("");

  // editing state
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // fetch all notes on load
  useEffect(() => {
    (async () => {
      try {
        const res = await API.get("/notes");
        setNotes(res.data);
      } catch (e) {
        console.error("Fetch failed:", e);
      }
    })();
  }, []);

  // create
  const addNote = async () => {
    const text = newText.trim();
    if (!text) return;
    try {
      const res = await API.post("/notes", { text });
      setNotes((prev) => [...prev, res.data]);
      setNewText("");
    } catch (e) {
      console.error("Add failed:", e);
    }
  };

  // delete
  const removeNote = async (id) => {
    try {
      await API.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch (e) {
      console.error("Delete failed:", e);
    }
  };

  // start edit
  const startEdit = (note) => {
    setEditingId(note._id);
    setEditingText(note.text);
  };

  // cancel edit
  const cancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  // save edit
  const saveEdit = async (id) => {
    const text = editingText.trim();
    if (!text) return;
    try {
      // helpful debug line:
      console.log("Saving id:", id, "text:", text);
      const res = await API.put(`/notes/${id}`, { text });
      setNotes((prev) => prev.map((n) => (n._id === id ? res.data : n)));
      cancelEdit();
    } catch (e) {
      console.error("Update failed:", e);
    }
  };

  return (
    <div className="note-app">
      <h2>📝 Simple Notes App</h2>

      <div className="note-input">
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          placeholder="Write a note..."
        />
        <button type="button" onClick={addNote}>Add</button>
      </div>

      <ul>
        {notes.map((n) => (
          <li key={n._id}>
            {editingId === n._id ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <div className="actions">
                  <button type="button" onClick={() => saveEdit(n._id)}>💾 Save</button>
                  <button type="button" onClick={cancelEdit}>✖ Cancel</button>
                </div>
              </>
            ) : (
              <>
                <span>{n.text}</span>
                <div className="actions">
                  <button type="button" onClick={() => startEdit(n)}>✏ Edit</button>
                  <button type="button" onClick={() => removeNote(n._id)}>🗑 Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
