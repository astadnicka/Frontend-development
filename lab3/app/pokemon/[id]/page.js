// import PokemonDetails from "../../components/PokemonDetails";

// export default async function PokemonDetailsPage({ params }) {
//   const { id } = params;
//   const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
//   const pokemon = await response.json();

//   return <PokemonDetails pokemon={pokemon} />;
// }

import PokemonDetails from "../../components/PokemonDetails";

export default async function PokemonDetailsPage({ params }) {
  const { id } = await params;

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

    if (!response.ok) {
      return (
        <div>
          <h1>Pokémon not found</h1>
          <p>The Pokémon with ID {id} does not exist. Please try another one!</p>
        </div>
      );
    }

    const pokemon = await response.json();
    return <PokemonDetails pokemon={pokemon} />;
  } catch (error) {
    return (
      <div>
        <h1>Error</h1>
        <p>Something went wrong while fetching Pokémon data. Please try again later.</p>
      </div>
    );
  }
}
