"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";

const AddNoteForm = ({pokemonId, onAddNote }) => {
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

  const validationSchema = Yup.object().shape({
    tacticName: Yup.string().required("Required").min(5).max(50),
    strategy: Yup.string().required("Required").min(10),
    effectiveness: Yup.number().required("Required").min(1).max(5),
    conditions: Yup.string().min(10, "Minimum 10 characters"),
    trainingDate: Yup.date().required("Required"),
    opponents: Yup.array().of(Yup.string()),
  });

 
  const handleSubmit = (values) => {
    const note = {
      id: uuidv4(),
      pokemonId: pokemonId,
      ...values,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const existingNotes = JSON.parse(localStorage.getItem("notes")) || [];
    localStorage.setItem("notes", JSON.stringify([...existingNotes, note]));
    onAddNote();
    window.location.href = `/pokemon/${pokemonId}`;
  };



  useEffect(() => {
    fetchTypes();
    }, []);

  return (
    <Formik
      initialValues={{
        tacticName: "",
        strategy: "",
        effectiveness: "",
        conditions: "",
        trainingDate: "",
        opponents: [],
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form>
          <div>
            <label>Nazwa taktyki</label>
            <Field name="tacticName" />
            <ErrorMessage name="tacticName" component="div" />
          </div>
          <div>
            <label>Opis strategii</label>
            <Field name="strategy" as="textarea" />
            <ErrorMessage name="strategy" component="div" />
          </div>
          <div>
            <label>Skuteczność</label>
            <Field name="effectiveness" as="select">
              <option value="">Select</option>
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </Field>
            <ErrorMessage name="effectiveness" component="div" />
          </div>
          <div>
            <label>Warunki użycia</label>
            <Field name="conditions" as="textarea" />
            <ErrorMessage name="conditions" component="div" />
          </div>
          <div>
            <label>Data treningu</label>
            <Field name="trainingDate" type="date" />
            <ErrorMessage name="trainingDate" component="div" />
          </div>
          <div>
              <label>Przeciwnicy</label>
              {types.length > 0 ? (
                <div role="group" aria-labelledby="checkbox-group">
                  {types.map((type) => (
                    <label key={type.name}>
                      <Field
                        type="checkbox"
                        name="opponents"
                        value={type.name}
                        checked={values.opponents.includes(type.name)}
                        onChange={({ target: { checked, value } }) => {
                          if (checked) {
                            // Dodaj typ do listy przeciwników
                            values.opponents.push(value);
                          } else {
                            // Usuń typ z listy przeciwników
                            values.opponents = values.opponents.filter((opponent) => opponent !== value);
                          }
                        }}
                      />
                      {type.name}
                    </label>
                  ))}
                </div>
              ) : (
                <p>Ładowanie typów...</p>
              )}
            </div>

          <button type="submit">Dodaj</button>
          <a href={`/pokemon/${pokemonId}`}>
            <button type="button">Anuluj</button>
          </a>
        </Form>
      )}
    </Formik>
  );
};

export default AddNoteForm;
