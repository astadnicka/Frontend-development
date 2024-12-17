"use client";

import { useEffect, useState } from "react";

function getFavorites() {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("favorites") || "[]");
    }
    return [];
}

export function removeFavorite(pokemon) {
    let favorites = getFavorites();
    favorites = favorites.filter((fav) => fav !== pokemon);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    window.location.reload()
  }

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  if (favorites.length > 0) {
    return (
      <ul>
        {favorites.map((pokemon) => (
          <li key={pokemon}>
       
            <a href={`/pokemon/${pokemon}`}>{pokemon}</a>
            <button onClick={() => removeFavorite(pokemon)}>Usuń z ulubionych</button>
          </li>
        ))}
      </ul>
    );
  }else{
    return <p>Nie masz jeszcze ulubionych Pokemonów. Dodaj kilka!</p>;
  };
};

