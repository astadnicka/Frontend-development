function PokemonDetails({ pokemon }) {
    return (
      <div id="danePokemona">
        <h3>{pokemon.name}</h3>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <p>Typy: {pokemon.types.map((type) => type.type.name).join(', ')}</p>
        <p>Statystyki:</p>
        <ul>
          {pokemon.stats.map((stat) => (
            <li key={stat.stat.name}>{stat.stat.name}: {stat.base_stat}</li>
          ))}
        </ul>
        <p>Wzrost: {pokemon.height}</p>
        <p>Waga: {pokemon.weight}</p>
      </div>
    );
  }
  