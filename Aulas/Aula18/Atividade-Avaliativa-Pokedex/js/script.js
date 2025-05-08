//Chama as informações do Pokémon do HTML
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


//Chama a música de fundo do HTML
const buttonMusic = document.getElementById("playMusic");
const musicBack = document.getElementById("bgMusic");


//Chama os icons dos tipos 
const tipoIcons = {
    grass: "./img/grass.png",
    poison: "./img/poison.png",
    fire: "./img/fire.png",
    water: "./img/water.png",
    electric: "./img/electric.png",
    psychic: "./img/psychic.png",
    dark: "./img/tipos/dark.png",
    steel: "./img/steel.png",
    rock: "./img/rock.png",
    ice: "./img/ice.png",
    fairy: "./img/fairy.png",
    fighting: "./img/fighting.png",
    ghost: "./img/ghost.png",
    dragon: "./img/dragon.png",
    ground: "./img/ground.png",
    bug: "./img/bug.png",
    flying: "./img/flying.png",
    normal: "./img/normal.png",
};

//Define o pokémon para iniciar
let numeroPokedex = 1;

//Link do PokeAPI com o JavaScript
const fetchPokemon = async (pokemon) => {
    const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    const data = await APIresponse.json();
    return data;
};

//Mostra o pokémon na Pokédex, nome e ID
const showPokemon = async (pokemon) => {
    const dataPokemon = await fetchPokemon(pokemon);
    numeroPokedex = dataPokemon.id;

    segundaImagem(dataPokemon.sprites.other.showdown.front_default, dataPokemon.sprites.front_default);
    nomeP.innerHTML = dataPokemon.name;
    idP.innerHTML = dataPokemon.id + "|";

    //Verificar se há segundo tipo e adiciona ao seu respectivo icon
    tipo1P.innerHTML = `<img src="${tipoIcons[dataPokemon.types[0].type.name]}" class="icon-tipo"> ${dataPokemon.types[0].type.name}`;
    if (dataPokemon.types.length > 1) {
        tipo2P.innerHTML = `<img src="${tipoIcons[dataPokemon.types[1].type.name]}" class="icon-tipo"> ${dataPokemon.types[1].type.name}`;
    } else {
        tipo2P.innerHTML = "";
    }


    habilidadeP.innerHTML = dataPokemon.abilities[0].ability.name;
    //Troca de libras para quilos
    pesoP.innerHTML = (dataPokemon.weight / 10).toFixed(2) + "kg";
    //Troca de pés para metros
    alturaP.innerHTML = (dataPokemon.height / 10).toFixed(2) + "m";

    //Tocar áudio para cada Pokémon
    function playAudio(sound) {
        sound = new Audio(sound);
        sound.play();
    }
    playAudio(dataPokemon.cries.legacy);
};




//Caso a imagem com animação dê erro, será substituida por uma estática:
function segundaImagem(gif, image) {
    imgP.src = gif;

    imgP.onerror = function () {
        this.onerror = null;
        this.src = image;
    }

    return;
}



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

//Tocar música
buttonMusic.addEventListener("click", () => {
    musicBack.play();
});