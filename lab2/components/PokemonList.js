function PokemonList({ pokemons, onPokemonDetails }) {
    return (
      <ul id="pokemonList">
        {pokemons.length === 0 ? (
          <li>Nie znaleziono takiego Pokémona :c</li>
        ) : (
          pokemons.map((pokemon, index) => {
            const pokemonId = pokemon.url.split('/')[6];
            return (
              <li key={pokemonId} onClick={() => onPokemonDetails(pokemon)}>
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`} alt={pokemon.name} />
                <p>{pokemon.name} (#{pokemonId})</p>
              </li>
            );
          })
        )}
      </ul>
    );
  }
  