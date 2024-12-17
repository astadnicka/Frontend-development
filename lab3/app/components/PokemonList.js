export default function PokemonList({ pokemons }) {
    return (
      <ul>
        {pokemons.map((pokemon) => (
          <li key={pokemon.name}>
            <img 
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} 
              alt={pokemon.name} 
              width="100" 
              height="100"
            />
            <a href={`/pokemon/${pokemon.name}`}>{pokemon.name}</a>
            <span>#{pokemon.id}</span> 

          </li>
        ))}
      </ul>
    );
}
