"use client";
import { useState, useEffect } from "react";

function getComparisonList() {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("comparisonList") || "[]");
  }
  return [];
}

function addToComparisonList(pokemon) {
  const list = getComparisonList();
  if (list.length < 2) {
    list.push(pokemon);
    localStorage.setItem("comparisonList", JSON.stringify(list));
  } 
}

function removeFromComparisonList(name) {
  let list = getComparisonList();
  list = list.filter((p) => p.name !== name);
  localStorage.setItem("comparisonList", JSON.stringify(list));
}
function getFavorites() {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("favorites") || "[]");
  }
  return [];
}

function addFavorite(pokemon) {
  const favorites = getFavorites();
  favorites.push(pokemon);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  window.location.reload();
}

function removeFavorite(pokemon) {
  let favorites = getFavorites();
  favorites = favorites.filter((fav) => fav !== pokemon);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  window.location.reload();
}


export default function PokemonDetails({ pokemon }) {
  const [favorites, setFavorites] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [comparison, setComparison] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFavorites(getFavorites());
      setComparison(getComparisonList());
    }
  }, []);

  function handleDetailsToggle() {
    setShowDetails((prev) => !prev);
  }

  function handleFavoritesChange() {
    if (favorites.includes(pokemon.name)) {
      removeFavorite(pokemon.name);
    } else {
      addFavorite(pokemon.name);
    }
  }

  function handleComparisonToggle() {
    const list = getComparisonList();
    if (list.find((p) => p.name === pokemon.name)) {
      removeFromComparisonList(pokemon.name);
    } else {
      addToComparisonList(pokemon);
    }
    setComparison(getComparisonList()); // Aktualizuj stan po każdej zmianie
  }

  return (
    <main>
      <div id="detailedPokemon">
        <h2>{pokemon.name}</h2>
        <div id="img">
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </div>
        <div id="short">
          <a>ID: {pokemon.id}</a>
        </div>
        <div id="buttons">
          <button onClick={handleFavoritesChange}>
            {favorites.includes(pokemon.name) ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
          </button>
          <button onClick={handleDetailsToggle}>
            {showDetails ? "Zwiń szczegóły" : "Pokaż szczegóły"}
          </button>
          <button
            onClick={handleComparisonToggle}
            disabled={
              comparison.length === 2 && !comparison.find((p) => p.name === pokemon.name)
            }
          >
            {comparison.find((p) => p.name === pokemon.name)
              ? "Usuń z porównania"
              : "Dodaj do porównania"}
          </button>
        </div>
      </div>
      {showDetails && (
        <div id="details">
          <p>Typ: {pokemon.types.map((type) => type.type.name).join(", ")}</p>
          <p>Wzrost: {pokemon.height}</p>
          <p>Waga: {pokemon.weight}</p>
          <p>Zdolności: {pokemon.abilities.map((ability) => ability.ability.name).join(", ")}</p>
        </div>
      )}
    </main>
  );
}
