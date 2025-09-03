import React, { useEffect, useState } from "react";
import API from "./api";

export default function NotesApp() {
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState("");
  const [editingId, setEditingId] = useState(null); // track which note is being edited

  // Fetch notes
  useEffect(() => {
    API.get("/notes")
      .then(res => setNotes(res.data))
      .catch(err => console.error("Error fetching notes:", err));
  }, []);

  // Add new note
  const handleAdd = async () => {
    if (!noteText.trim()) return;

    try {
      const res = await API.post("/notes", { text: noteText });
      setNotes([...notes, res.data]);
      setNoteText("");
    } catch (err) {
      console.error("Error adding note:", err);
    }
  };

  // Delete note
  const handleDelete = async (id) => {
    try {
      await API.delete(`/notes/${id}`);
      setNotes(notes.filter(n => n._id !== id));
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  // Start editing
  const handleEdit = (id, text) => {
    setEditingId(id);
    setNoteText(text);
  };

  // Save updated note
  const handleUpdate = async () => {
    if (!noteText.trim() || !editingId) return;

    try {
      const res = await API.put(`/notes/${editingId}`, { text: noteText });

      setNotes(notes.map(n => (n._id === editingId ? res.data : n)));
      setNoteText("");
      setEditingId(null); // reset editing mode
    } catch (err) {
      console.error("Error updating note:", err);
    }
  };

  return (
    <div className="note-app">
      <h2>📝 Simple Notes App</h2>

      <input
        type="text"
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        placeholder="Write a note..."
      />

      {editingId ? (
        <button onClick={handleUpdate}>💾 Save</button> // Save when editing
      ) : (
        <button onClick={handleAdd}>➕ Add</button> // Add new note
      )}

      <ul>
        {notes.map((n) => (
          <li key={n._id}>
            {n.text}
            <div className="actions">
              <button onClick={() => handleEdit(n._id, n.text)}>✏️ Edit</button>
              <button onClick={() => handleDelete(n._id)}>🗑 Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
