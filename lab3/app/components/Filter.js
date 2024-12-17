"use client";

export default function Filter({ types }) {
  function handleFilterChange(event) {
    const params = new URLSearchParams(window.location.search);
    params.set(event.target.name, event.target.value);
    window.location.href = `?${params}`;
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleFilterChange(event);
    }
  }

  return (
    <div id="filter">
      <input
        type="text"
        name="search"
        placeholder="Search Pokemon"
        defaultValue={new URLSearchParams(window.location.search).get("search") || ""}
        onKeyDown={handleKeyDown}
      />
      <select
        name="type"
        defaultValue={new URLSearchParams(window.location.search).get("type") || ""}
        onChange={handleFilterChange}
      >
        <option value="">All Types</option>
        {types.map((type) => (
          <option key={type.name} value={type.name}>
            {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
          </option>
        ))}
      </select>
      <input id="number"
        type="number"
        name="limit"
        placeholder="Liczba wyświetlanych Pokemonów"
        min="1"
        defaultValue={new URLSearchParams(window.location.search).get("limit") || "20"}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
