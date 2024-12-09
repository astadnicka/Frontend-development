function PokemonSearcher({ search, onSearch }) {
    function handleInputChange(event) {
      onSearch(event.target.value);
    }
  
    return (
      <input
        type="text"
        className="search"
        placeholder="Wyszukaj pokemona ૮₍'｡ᵔ ꈊ ᵔ｡`₎ა"
        value={search}
        onChange={handleInputChange}
      />
    );
  }
  