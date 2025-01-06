import { useEffect, useState } from "react";

export default function Filter({ types, onFiltersChange }) {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [limit, setLimit] = useState("20");

  const localStorageKey = "pokemonFilters";

  useEffect(() => {
    const storedFilters = localStorage.getItem(localStorageKey);
    if (storedFilters) {
      const parsedFilters = JSON.parse(storedFilters);
      setSearch(parsedFilters.search || "");
      setType(parsedFilters.type || "");
      setLimit(parsedFilters.limit || "20");
      onFiltersChange(parsedFilters);
    }
  }, []);

  const saveFiltersToLocalStorage = (filters) => {
    localStorage.setItem(localStorageKey, JSON.stringify(filters));
  };

  const handleFilterChange = (name, value) => {
    const newFilters = { search, type, limit, [name]: value };
    setSearch(newFilters.search);
    setType(newFilters.type);
    setLimit(newFilters.limit);

    saveFiltersToLocalStorage(newFilters);
    onFiltersChange(newFilters);
  };

  const handleInputChange = (e, name) => {
    handleFilterChange(name, e.target.value);
  };

  const handleKeyDown = (e, name) => {
    if (e.key === "Enter") {
      handleFilterChange(name, e.target.value);
    }
  };

  return (
    <div id="filter">
      <input
        type="text"
        name="search"
        placeholder="Szukaj Pokemonów"
        value={search}
        onChange={(e) => handleInputChange(e, "search")}
        onKeyDown={(e) => handleKeyDown(e, "search")}
      />
      <select
        name="type"
        value={type}
        onChange={(e) => handleInputChange(e, "type")}
        onKeyDown={(e) => handleKeyDown(e, "type")}
      >
        <option value="">Wszystkie typy</option>
        {types.map((type) => (
          <option key={type.name} value={type.name}>
            {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
          </option>
        ))}
      </select>
      <input
        type="number"
        name="limit"
        min="1"
        placeholder="Ilość Pokemonów"
        value={limit}
        onChange={(e) => handleInputChange(e, "limit")}
        onKeyDown={(e) => handleKeyDown(e, "limit")}
      />
    </div>
  );
}
