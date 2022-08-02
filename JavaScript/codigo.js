const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonType = document.querySelector('.pokemon__type');
const pokemonImage = document.querySelector('.pokemon__image');
const pokemonImage2 = document.querySelector('.pokemon__image2');
const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1; 

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if (APIResponse.status == 200){
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Buscando...';
    pokemonNumber.innerHTML = '';
    const data = await fetchPokemon(pokemon);

if (data){
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonType.innerHTML = data['types']['0']['type']['name'].toUpperCase();
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    pokemonImage2.src = data['sprites']['versions']['generation-v']['black-white']['animated']['back_default'];
    input.value = '';
    searchPokemon = data.id;
    }else{
        pokemonImage.style.display = 'none';
        pokemonImage2.style.display = 'none';
        pokemonName.innerHTML = '# Não encontrado # #';
        pokemonNumber.innerHTML = '';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase())
});
buttonPrev.addEventListener('click', () => {
    if(searchPokemon > 1){
    searchPokemon -= 1;
    renderPokemon(searchPokemon);}
});
buttonNext.addEventListener('click', () => {
    if(searchPokemon < 649){
    searchPokemon += 1;
    renderPokemon(searchPokemon);
    }
});

renderPokemon(searchPokemon);