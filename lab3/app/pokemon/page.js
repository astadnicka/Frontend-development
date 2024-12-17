import PokemonList from "../components/PokemonList";
import Filter from "../components/Filter";

export default async function PokemonPage({ searchParams }) {
  const search = searchParams?.search || "";
  const limit = parseInt(searchParams?.limit, 10) || 20; // Domyślna wartość to 20
  const type = searchParams?.type || "";

  const typeResponse = await fetch(`https://pokeapi.co/api/v2/type`);
  const typeData = await typeResponse.json();

  let allPokemons = [];

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1500`);
  const data = await response.json();
  allPokemons = data.results;

  let filteredPokemons = [];

  if (type) {
    const typeDetailsResponse = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
    const typeDetailsData = await typeDetailsResponse.json();
    filteredPokemons = typeDetailsData.pokemon.map(p => p.pokemon);
  } else {
    filteredPokemons = allPokemons;
  }

  const searchFilteredPokemons = filteredPokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  const limitedPokemons = searchFilteredPokemons.slice(0, limit);

  const detailedPokemons = await Promise.all(
    limitedPokemons.map(async (pokemon) => {
      const pokemonDetails = await fetch(pokemon.url);
      const pokemonData = await pokemonDetails.json();
      return pokemonData;
    })
  );

  return (
    <>
      <Filter types={typeData.results} />
      <PokemonList pokemons={detailedPokemons} />
    </>
  );
}
