import { useState, useEffect } from "react";

export default function NoteList({ pokemonId }) {
  const [notes, setNotes] = useState([]);
  const [sortOrder, setSortOrder] = useState("default");

  useEffect(() => {
    const allNotes = JSON.parse(localStorage.getItem("notes")) || [];
    const filteredNotes = allNotes.filter((note) => note.pokemonId == pokemonId);
    const sortedNotes = sortNotes(filteredNotes);
    setNotes(sortedNotes);
  }, [pokemonId, sortOrder]);

  useEffect(() => {
    const savedSortOrder = localStorage.getItem("sortOrder");
    if (savedSortOrder) {
      setSortOrder(savedSortOrder);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("sortOrder", sortOrder);
  }, [sortOrder]);

  const sortNotes = (notesToSort) => {
    return [...notesToSort].sort((a, b) => {
      switch (sortOrder) {
        case "najnowsza1": 
          return new Date(b.updatedAt) - new Date(a.updatedAt);
        case "najstarsza1": 
          return new Date(a.updatedAt) - new Date(b.updatedAt);
        case "najnowsza2": 
          return new Date(b.trainingDate) - new Date(a.trainingDate);
        case "najstarsza2": 
          return new Date(a.trainingDate) - new Date(b.trainingDate);
        default:
          return 0;
      }
    });
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleDelete = (noteId) => {
    const updatedNotes = notes.filter((note) => note.id !== noteId);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
  };

  return (
    <section>
      <h2>Notatki treningowe</h2>
      <button onClick={() => window.location.href = `/pokemon/${pokemonId}/note`}>Dodaj nową notatkę</button>
      <div>
        <label htmlFor="sortOrder">Sortuj według:</label>
        <select id="sortOrder" onChange={handleSortChange} value={sortOrder}>
          <option value="default">Brak sortowania</option>
          <option value="najnowsza1">Data wpisania (od najnowszej)</option>
          <option value="najstarsza1">Data wpisania (od najstarszej)</option>
          <option value="najnowsza2">Data treningu (od najnowszej)</option>
          <option value="najstarsza2">Data treningu (od najstarszej)</option>
        </select>
      </div>
      <ul>
        {notes.length === 0 ? (
          <li>Brak notatek dla tego Pokémona.</li>
        ) : (
          notes.map((note) => (
            <li key={note.id}>
              <h3>{note.tacticName}</h3>
              <p>{note.strategy}</p>
              <p>Skuteczność: {note.effectiveness}</p>
              <p>Data treningu: {note.trainingDate}</p>
              <p>Przeciwnicy: {note.opponents.join(", ")}</p>
              <button onClick={() => window.location.href = `/pokemon/${pokemonId}/note?noteid=${note.id}`}>Edytuj</button>
              <button onClick={() => handleDelete(note.id)}>Usuń</button>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}
