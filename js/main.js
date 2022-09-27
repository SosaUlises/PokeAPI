// Seleccionamos elementos
const card = document.querySelector(".card");
const input = document.querySelector('.input');
const message = document.querySelector('.message');
const form = document.querySelector('.form');

// Array de Pokemones
let pokemones = JSON.parse(localStorage.getItem("pokemon")) || [];

const saveLocalStorage = pokemonList =>{
    localStorage.setItem("pokemon", JSON.stringify(pokemonList));
}

// Funcion para renderizar card en HTML
const renderCard = pokemon =>{
    let pokePeso = pokemon.height / 10
    let pokeAltura = pokemon.weight / 10
    return `
    <div class="card-container">
    <div class="title-contenedor"><p class="pokeEXP">EXP ${pokemon.base_experience}</p><i class="fa-solid fa-x close" data-id="${pokemon.id}"></i></div>
    <h2 class="title-card"> ${pokemon.name} </h2>
    <img class="img-container" src="${pokemon.sprites.front_default}">
    <div class="tipo-poke">
        ${pokemon.types.map(tipo => {
          return `<span class="${tipo.type.name} poke__type">${tipo.type.name}</span>`;
        }).join("")}
    </div>
    <p class="pokeP">Peso ${pokePeso} kg</p>
    <p class="pokeP">Altura ${pokeAltura} m</p>
    </div>
    `
}

// Funcion de logica para renderizar card
const renderPokeList = pokeList =>{
    card.innerHTML = pokeList.map(pokemon => renderCard(pokemon)).join("")
}

// Funcion para buscar un pokemon
const searchPokemon = async e =>{
    e.preventDefault();

    // Obtenemos valor del input
    const idSearch = input.value;

    if(idSearch === ""){
        showMessage("error", "Debes escribir un número!");
        return;
    }

    // Pasamos el valor del input al request
    const fetchedPokemon = await requestPokemon(idSearch);

    // Mensaje que ya estamos mostrando ese pokemon
    if(pokemones.some(pokemon => pokemon.id === fetchedPokemon.id)){
        showMessage("error", "Ya estamos mostrando a ese pokemon");
        form.reset();
        return;
    }
    
    console.log(fetchedPokemon)
    pokemones = [fetchedPokemon, ...pokemones];
    renderPokeList(pokemones);
    saveLocalStorage(pokemones);
    form.reset();
}

// Mostrar mensaje de error
function showMessage(style, text){
    const p = document.createElement('p')
    p.textContent = text;
    p.classList.add(style);
    message.appendChild(p)
    setTimeout(() => {
        form.reset();
        p.remove()
    }, 2000);
}
// Remover un pokemon al hacer click en la X
const removePokemon = e =>{
    if(!e.target.classList.contains("close")){
        return;
    }else{
        const filtrarID = Number(e.target.dataset.id);
        pokemones = pokemones.filter(pokemon => pokemon.id !== filtrarID);
        renderPokeList(pokemones);
        saveLocalStorage(pokemones);
    }
     
    
    
}

// Funcion de inicio
const init = () =>{
    renderPokeList(pokemones);
form.addEventListener("submit",searchPokemon);
card.addEventListener("click", removePokemon);
}

init();