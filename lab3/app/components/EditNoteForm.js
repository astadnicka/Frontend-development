"use client";
import { useState, useEffect } from "react";

export default function EditNoteForm({ pokemonId, noteId }) {
  const [note, setNote] = useState(null); 
  const [formValues, setFormValues] = useState({
    tacticName: "",
    strategy: "",
    effectiveness: 3,
    conditions: "",
    trainingDate: "",
    opponents: [],
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [types, setTypes] = useState([]);

  //typy
  const fetchTypes = async () => {
    try {
      const typeResponse = await fetch("https://pokeapi.co/api/v2/type");
      const typeData = await typeResponse.json();
      setTypes(typeData.results);
    } catch (error) {
      console.error("Błąd podczas pobierania typów:", error);
    }
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  // Załaduj dane notatki
  useEffect(() => {
    if (noteId) {
      const allNotes = JSON.parse(localStorage.getItem("notes")) || [];
      const noteToEdit = allNotes.find((note) => note.id === noteId);
      if (noteToEdit) {
        setFormValues(noteToEdit);
      }
    }
    setIsLoading(false);
  }, [noteId]);

  // Walidacja formularza
  const validateForm = () => {
    const newErrors = {};
    if (!formValues.tacticName || formValues.tacticName.length < 5 || formValues.tacticName.length > 50) {
      newErrors.tacticName = "Nazwa taktyki musi mieć od 5 do 50 znaków.";
    }
    if (!formValues.strategy || formValues.strategy.length < 10) {
      newErrors.strategy = "Opis strategii musi mieć co najmniej 10 znaków.";
    }
    if (!formValues.effectiveness || formValues.effectiveness < 1 || formValues.effectiveness > 5) {
      newErrors.effectiveness = "Skuteczność musi być liczbą od 1 do 5.";
    }
    if (formValues.conditions && formValues.conditions.length < 10) {
      newErrors.conditions = "Warunki użycia muszą mieć co najmniej 10 znaków.";
    }
    if (!formValues.trainingDate) {
      newErrors.trainingDate = "Data treningu jest wymagana.";
    }
    if (formValues.opponents.length === 0) {
      newErrors.opponents = "Wybierz przynajmniej jeden typ przeciwnika.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Zapisz zmiany
  const onSave = (updatedNote) => {
    console.log("Zapisuję notatkę: ", updatedNote);
    const allNotes = JSON.parse(localStorage.getItem("notes")) || [];
    const updatedNotes = allNotes.map((note) =>
      note.id === updatedNote.id ? updatedNote : note
    );
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    // Po zapisaniu, przekierowanie do strony pokemona
    window.location.href = `/pokemon/${pokemonId}`;
  };

  // Zapisz formularz
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const updatedNote = {
        ...formValues,
        id: noteId,
        pokemonId,
        updatedAt: new Date().toISOString(),
      };
      onSave(updatedNote);
    }
  };

  // Zaktualizuj wartość w formularzu
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      const updatedOpponents = checked
        ? [...formValues.opponents, value]
        : formValues.opponents.filter((opponent) => opponent !== value);
      setFormValues({ ...formValues, opponents: updatedOpponents });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  if (isLoading) {
    return <div>Ładowanie...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nazwa taktyki:
        <input
          type="text"
          name="tacticName"
          value={formValues.tacticName}
          onChange={handleChange}
        />
        {errors.tacticName && <div>{errors.tacticName}</div>}
      </label>
      <label>
        Opis strategii:
        <textarea
          name="strategy"
          value={formValues.strategy}
          onChange={handleChange}
        />
        {errors.strategy && <div>{errors.strategy}</div>}
      </label>
      <label>
        Skuteczność:
        <select
          name="effectiveness"
          value={formValues.effectiveness}
          onChange={handleChange}
        >
          {[1, 2, 3, 4, 5].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        {errors.effectiveness && <div>{errors.effectiveness}</div>}
      </label>
      <label>
        Warunki użycia:
        <textarea
          name="conditions"
          value={formValues.conditions}
          onChange={handleChange}
        />
        {errors.conditions && <div>{errors.conditions}</div>}
      </label>
      <label>
        Data treningu:
        <input
          type="date"
          name="trainingDate"
          value={formValues.trainingDate}
          onChange={handleChange}
        />
        {errors.trainingDate && <div>{errors.trainingDate}</div>}
      </label>
      <label>
        Przeciwnicy:
        <div role="group">
          {types.map((type) => (
            <label key={type.name}>
              <input
                type="checkbox"
                name="opponents"
                value={type.name}
                checked={formValues.opponents.includes(type.name)}
                onChange={handleChange}
              />
              {type.name}
            </label>
          ))}
        </div>
        {errors.opponents && <div>{errors.opponents}</div>}
      </label>
      <button type="submit">{noteId ? "Zapisz zmiany" : "Dodaj notatkę"}</button>
      {/* Zmieniono przycisk anulowania na link */}
      <a href={`/pokemon/${pokemonId}`}>
        <button type="button">Anuluj</button>
      </a>
    </form>
  );
}
