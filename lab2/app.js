function App() {
  let allPokemons = []; 
  let pokemons = []; 
  let selectedPokemon = null; 
  let search = ""; 
  let isLoading = false; 

  async function getPokemonList() {
    try {
      isLoading = true;
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=151"
      );
      if (!response.ok)
        throw new Error("Błąd podczas pobierania listy Pokémonów!");
      const data = await response.json();
      allPokemons = data.results;
      pokemons = allPokemons.slice(0, 20); 
    } catch (error) {
      console.error(error);
    } finally {
      isLoading = false;
      renderApp();
    }
  }

  async function getPokemonDetails(pokemon) {
    try {
      isLoading = true;
      renderApp();
      await new Promise((resolve) => setTimeout(resolve, 200));

      const response = await fetch(pokemon.url);
      if (!response.ok)
        throw new Error("Błąd podczas pobierania szczegółów Pokémona!");
      selectedPokemon = await response.json();
    } catch (error) {
      console.error(error);
    } finally {
      isLoading = false;
      renderApp();
    }
  }

  function onSearch(searchValue) {
    
    search = searchValue;
    
    selectedPokemon = null; 

    const filteredPokemons = allPokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().startsWith(searchValue.toLowerCase())
    );
    pokemons = filteredPokemons.slice(0,20); 
    renderApp();
  }

  function renderApp() {
    ReactDOM.render(
      <div id="main">
        <PokemonSearcher search={search} onSearch={onSearch} />
        <div id="container">
          {isLoading && (
            <div id="loading">
              <img
                src="pikachu-running.gif"
                alt="Ładowanie..."
                height="60px"
              />
              <p>Ładowanie...</p>
            </div>
          )}
          <div id="listy">
            <PokemonList
              pokemons={pokemons}
              onPokemonDetails={getPokemonDetails}
            />
            {selectedPokemon ? (
              <PokemonDetails pokemon={selectedPokemon} />
            ) : (
              <p id="detailsPlaceholder">Wyszukaj Pokémona, aby wyświetlić szczegóły.</p>
            )}
          </div>
        </div>
      </div>,
      document.getElementById("app")
    );
  }
  
  
  

  React.useEffect(() => {
    getPokemonList();
    
  }, []);

  return null; 
}

ReactDOM.render(<App />, document.getElementById("app"));
