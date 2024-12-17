import PokemonDetails from "../../components/PokemonDetails";

export default async function PokemonDetailsPage({ params }) {
  const { id } = params;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemon = await response.json();

  return <PokemonDetails pokemon={pokemon} />;
}
