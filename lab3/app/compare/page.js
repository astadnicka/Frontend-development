"use client";
import { useState, useEffect } from "react";
import PokemonDetails from "../components/PokemonDetails"; 


function getComparisonList() {
if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("comparisonList") || "[]");
}
return [];
}
 
  
function clearComparisonList() {
localStorage.setItem("comparisonList", JSON.stringify([]));
}


  

export default function ComparePage() {
  const [comparisonList, setComparisonList] = useState([]);

  useEffect(() => {
    setComparisonList(getComparisonList());
  }, []);

  if (comparisonList.length === 0) {
    return <p>Dodaj Pokemony do porównania!</p>;
  }

  function handleClearComparison() {
    clearComparisonList();
    setComparisonList([]);
  }


  return (
    <div>
      <h1 id="porownanie">Porównanie Pokemonów</h1>
      <div id="compare" style={{ display: "flex" }}>
        {comparisonList.map((pokemon) => (
          <PokemonDetails 
            key={pokemon.name} 
            pokemon={pokemon} 
          />
        ))}
      </div>
      <button onClick={handleClearComparison}>Wyczyść porównanie</button>
    </div>
  );
}
