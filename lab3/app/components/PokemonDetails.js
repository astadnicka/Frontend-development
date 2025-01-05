"use client";
import { useState, useEffect } from "react";

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

//zabije sieeeee 
function removeFavorite(pokemon) {
  let favorites = getFavorites();
  favorites = favorites.filter((fav) => fav !== pokemon);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  window.location.reload();
}

export default function PokemonDetails({ pokemon }) {
  const [favorites, setFavorites] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFavorites(getFavorites());
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
