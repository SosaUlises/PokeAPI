
// Conectamos con la API 
const requestPokemon = async id => {
    try {
    const baseURL = `https://pokeapi.co/api/v2/pokemon/`
    const query = `${id}`

    const response = await fetch(baseURL + query);

    const data = await response.json();
    
    return data;
    } catch (error) {
        showMessage("error", "No existe ese pokemon!")
    }
    
}

