let imgP = document.querySelector("#imgPoke");
let formP = document.querySelector("#form");
let inputF = document.querySelector("#inputForm");
let nomeP = document.querySelector("#nomePoke");
let idP = document.querySelector("#idPokemon");
let tipo1P = document.querySelector("#tipo1");
let tipo2P = document.querySelector("#tipo2");
let habilidadeP = document.querySelector("#habilidade");
let pesoP = document.querySelector("#peso");
let alturaP = document.querySelector("#altura");
let returnP = document.querySelector("#return");
let advanceP = document.querySelector("#advance");

let numeroPokedex = 1;

const fetchPokemon = async (pokemon) => {
    const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    const data = await APIresponse.json();
    return data;
};

const showPokemon = async (pokemon) => {
    const dataPokemon = await fetchPokemon(pokemon);
    imgP.src = dataPokemon.sprites.other.showdown.front_default;
    nomeP.innerHTML = dataPokemon.name;
    idP.innerHTML = dataPokemon.id + "|";
    tipo1P.innerHTML = dataPokemon.types[0].type.name
    //Verificar se há segundo tipo
    if (dataPokemon.types.length > 1) {
        tipo2P.innerHTML = dataPokemon.types[1].type.name;
    } else {
        tipo2P.innerHTML = "-";
    }
    habilidadeP.innerHTML = dataPokemon.abilities[0].ability.name;
    pesoP.innerHTML = (dataPokemon.weight / 10).toFixed(2) + "kg";
    alturaP.innerHTML = (dataPokemon.height / 10).toFixed(2) + "cm";
    
    //Rodar áudio
    playAudio(dataPokemon.cries.legacy);
    function playAudio(som) {
        som = new Audio(som);
        som.play();
    }
};


//Mostrar Pokémon
formP.addEventListener("submit", (event) => {
    event.preventDefault();
    showPokemon(inputF.value.toLowerCase());
});


//Retornar
returnP.addEventListener("click", (event) => {
    if (numeroPokedex > 1) {
        numeroPokedex = numeroPokedex - 1;
        showPokemon(numeroPokedex);
    }
});

//Avançar
advanceP.addEventListener("click", (event) => {
    if (numeroPokedex < 1024) {
        numeroPokedex = numeroPokedex + 1;
        showPokemon(numeroPokedex);
    }
});
