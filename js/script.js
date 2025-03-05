const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.class_form');
const input = document.querySelector('.input_search');

const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let currentPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const data = await APIResponse.json();
    return data;
}

const renderPokemon = async (pokemon) => {
    const data = await fetchPokemon(pokemon);

    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']
        ['animated']['front_default'];
}

const fetchPokemonByName = async (name) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    const data = await APIResponse.json();
    return data.id; 
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    let searchValue = input.value.trim().toLowerCase();

    if (searchValue) {
        if (isNaN(searchValue)) {

            const pokemonId = await fetchPokemonByName(searchValue);
            currentPokemon = pokemonId; 
        } else {

            currentPokemon = parseInt(searchValue);
        }
        renderPokemon(currentPokemon);
    }
});

buttonPrev.addEventListener('click', () => {
    if (currentPokemon > 1) {
        currentPokemon--; 
        renderPokemon(currentPokemon);
    }
});

buttonNext.addEventListener('click', () => {
    currentPokemon++; 
    renderPokemon(currentPokemon);
});

renderPokemon(currentPokemon);