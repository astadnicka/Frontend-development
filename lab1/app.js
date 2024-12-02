function delay(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

async function fetchPokemonList() {
    const loading = document.getElementById('loading');
    loading.classList.remove('hidden'); // usuwa clase hidden czyli display none wiec jest widoczne
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
        const data = await response.json();
        displayPokemonList(data.results);
    } catch (error) {
        console.error('Błąd pobierania listy Pokemonów:', error);
    } finally {
        loading.classList.add('hidden'); //dodaje spowrotem display none, mądre :)
    }
}

function displayPokemonList(pokemons) {
    const pokemonList = document.getElementById('pokemonList');
    pokemonList.innerHTML = '';
    pokemons.forEach((pokemon, index) => {
        const listItem = document.createElement('li');
        const pokemonId = index + 1;
        listItem.innerHTML = `<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png" alt="${pokemon.name}"> ${pokemon.name} (#${pokemonId})`;
        listItem.addEventListener('click', () => fetchPokemonDetails(pokemonId));
        pokemonList.appendChild(listItem);
    });
}

async function fetchPokemonDetails(pokemonId) {
    const loading = document.getElementById('loading');
    loading.classList.remove('hidden'); 
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        if (!response.ok) {
            throw new Error(`Pokémon z ID ${pokemonId} nie znaleziony`);
        }
        const pokemon = await response.json();
        await delay(300);
        displayPokemonDetails(pokemon);
    } catch (error) {
        console.error('Błąd pobierania szczegółów Pokemona:', error);
        alert(`Błąd: ${error.message}`);
    } finally {
        loading.classList.add('hidden'); 
    }
}

async function displayPokemonDetails(pokemon) {
    const danePokemona = document.getElementById('danePokemona');
    danePokemona.innerHTML = `
        <h3>${pokemon.name}</h3>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <p>Typy: ${pokemon.types.map(type => type.type.name).join(', ')}</p>
        <p>Statystyki:</p>
        <ul>
            ${pokemon.stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join('')}
        </ul>
        <p>Wzrost: ${pokemon.height}</p>
        <p>Waga: ${pokemon.weight}</p>
    `;
    await delay(2000); 
}

async function searchPokemon() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const loading = document.getElementById('loading');
    if (searchInput) {
        loading.classList.remove('hidden'); 
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchInput}`);
            if (!response.ok) {
                throw new Error(`Pokémon ${searchInput} nie znaleziony`);
            }
            const pokemon = await response.json();
            await delay(2000); 
            displayPokemonDetails(pokemon);
        } catch (error) {
            console.error('Błąd wyszukiwania Pokemona:', error);
            alert(`Błąd: ${error.message}`);
        } finally {
            loading.classList.add('hidden'); 
        }
    }
}

// Inicjalizacja listy Pokemonów przy załadowaniu strony
window.onload = fetchPokemonList;








//werjsa podmieniania listy na wybranego polemona



// async function fetchPokemonList() {
//     try {
//         const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
//         const data = await response.json();
//         displayPokemonList(data.results);
//     } catch (error) {
//         console.error('Błąd pobierania listy Pokemonów:', error);
//     }
// }

// function displayPokemonList(pokemons) {
//     const pokemonList = document.getElementById('pokemonList');
//     pokemonList.innerHTML = '';
//     pokemons.forEach((pokemon, index) => {
//         const listItem = document.createElement('li');
//         const pokemonId = index + 1;
//         listItem.innerHTML = `<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png" alt="${pokemon.name}"> ${pokemon.name} (#${pokemonId})`;
//         listItem.addEventListener('click', () => fetchPokemonDetails(pokemonId));
//         pokemonList.appendChild(listItem);
//     });
// }

// async function fetchPokemonDetails(pokemonId) {
//     try {
//         const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
//         const pokemon = await response.json();
//         displayPokemonDetails(pokemon);
//     } catch (error) {
//         console.error('Błąd pobierania szczegółów Pokemona:', error);
//     }
// }

// function displayPokemonDetails(pokemon) {
//     const danePokemona = document.getElementById('danePokemona');
//     danePokemona.innerHTML = `
//         <h3>${pokemon.name}</h3>
//         <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
//         <p>Typy: ${pokemon.types.map(type => type.type.name).join(', ')}</p>
//         <p>Statystyki:</p>
//         <ul>
//             ${pokemon.stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join('')}
//         </ul>
//         <p>Wzrost: ${pokemon.height}</p>
//         <p>Waga: ${pokemon.weight}</p>
//     `;
// }

// async function searchPokemon() {
//     const searchInput = document.getElementById('searchInput').value.toLowerCase();
//     if (searchInput) {
//         try {
//             const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchInput}`);
//             const pokemon = await response.json();
//             displaySearchedPokemon(pokemon); // wyswietla (podmiania) szukanego pokmenoa na liście
//         } catch (error) {
//             console.error('Błąd wyszukiwania Pokemona:', error);
//         }
//     }
// }

// function displaySearchedPokemon(pokemon) {
//     const pokemonList = document.getElementById('pokemonList');
//     pokemonList.innerHTML = '';
//     const listItem = document.createElement('li');
//     listItem.innerHTML = `<img src="${pokemon.sprites.front_default}" alt="${pokemon.name}"> ${pokemon.name} (#${pokemon.id})`;
//     listItem.addEventListener('click', () => displayPokemonDetails(pokemon));
//     pokemonList.appendChild(listItem);
// }

// window.onload = fetchPokemonList;
