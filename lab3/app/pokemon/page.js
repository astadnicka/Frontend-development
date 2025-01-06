"use client";

import { useEffect, useState } from "react";
import Filter from "../components/Filter";
import PokemonList from "../components/PokemonList";
// import Compare from "../components/Compare";

export default function PokemonPage() {
  const [filters, setFilters] = useState({
    search: "",
    type: "",
    limit: 20,
  });

  const [pokemons, setPokemons] = useState([]);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTypes = async () => {
    try {
      const typeResponse = await fetch("https://pokeapi.co/api/v2/type");
      const typeData = await typeResponse.json();
      setTypes(typeData.results);
    } catch (error) {
      console.error("Błąd podczas pobierania typów:", error);
    }
  };

  const fetchPokemons = async () => {
    setLoading(true);
    try {
      const { search, type, limit } = filters;

      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1500");
      const data = await response.json();
      const allPokemons = data.results;

      let filteredPokemons = [];

      if (type) {
        const typeDetailsResponse = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
        const typeDetailsData = await typeDetailsResponse.json();
        filteredPokemons = typeDetailsData.pokemon.map((p) => p.pokemon);
      } else {
        filteredPokemons = allPokemons;
      }

      const searchFilteredPokemons = filteredPokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(search.toLowerCase())
      );

      const limitedPokemons = searchFilteredPokemons.slice(0, limit);

      const detailedPokemons = await Promise.all(
        limitedPokemons.map(async (pokemon) => {
          const pokemonDetails = await fetch(pokemon.url);
          return pokemonDetails.json();
        })
      );

      setPokemons(detailedPokemons);
    } catch (error) {
      console.error("Błąd podczas pobierania Pokemonów:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  useEffect(() => {
    fetchPokemons();
  }, [filters]);

  const handleFiltersChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  return (
    <div>
      <Filter types={types} onFiltersChange={handleFiltersChange} />
      {loading ? <p>Ładowanie...</p> : <PokemonList pokemons={pokemons} />}
      {/* <Compare />  */}
    </div>
  );
}