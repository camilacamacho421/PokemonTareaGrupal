// Función para buscar Pokémon por name o ID 
function searchPokemon() {
    const input = document.getElementById('pokemonInput').value.toLowerCase();
    const Pokeurl = `https://pokeapi.co/api/v2/pokemon/${input}`;
  
    fetch(Pokeurl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Pokémon no encontrado');
        }
        return response.json();
      })
      .then(pokemon => {
        displayPokemonDetails(pokemon);
      })
      .catch(error => {
        document.getElementById('pokemonDetails').innerHTML = `<p>${error.message}</p>`;
      });
  }
  
// Función para mostrar los detalles del Pokémon
function displayPokemonDetails(pokemon) {
    const name = pokemon.name;
    const id = String(pokemon.id).padStart(4, '0'); // Formatea el ID a 4 cifras
    const abilities = pokemon.abilities.map(ability => ability.ability.name).join(', ');
    const height = pokemon.height;
    const weight = pokemon.weight;
    const types = pokemon.types.map(type => type.type.name).join(', ');
    const imageUrl = pokemon.sprites.other['official-artwork'].front_default; // URL de la imagen
  
    const details = `
      <div class="card">
        <img src="${imageUrl}" alt="${name}">
        <h2>${name.charAt(0).toUpperCase() + name.slice(1)}</h2> 
        <p><strong>#</strong> ${id}</p>
        <p><strong>Habilidades:</strong> ${abilities}</p>
        <p><strong>Altura:</strong> ${height}m</p>
        <p><strong>Peso:</strong> ${weight}kg</p>
        <p><strong>Tipos:</strong> ${types}</p>
      </div>
    `;
  
    document.getElementById('pokemonDetails').innerHTML = details;

    // Reproduce el sonido
    const sound = document.getElementById('pokemonSound');
    sound.currentTime = 0; // Reinicia el sonido para que siempre suene desde el inicio
    sound.play();
  }
  