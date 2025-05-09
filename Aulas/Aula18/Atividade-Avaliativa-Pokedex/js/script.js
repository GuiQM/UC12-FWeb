//Chama as informações do Pokémon do HTML
let imgP = document.querySelector("#imgPoke"); //Chama a imagem do Pokémon que aparece na Pokédex
let formP = document.querySelector("#form"); //Chama o form do input
let inputF = document.querySelector("#inputForm"); //Área de pesquisa de Pokémon
let nomeP = document.querySelector("#nomePoke"); //Mostra o nome
let idP = document.querySelector("#idPokemon"); //Mostra o ID
let tipo1P = document.querySelector("#tipo1"); //Mostra o tipo 1 
let tipo2P = document.querySelector("#tipo2"); //Mostra o tipo 2 (caso tiver)
let habilidadeP = document.querySelector("#habilidade"); //Mostra a habilidade
let pesoP = document.querySelector("#peso"); //Mostra o peso
let alturaP = document.querySelector("#altura"); //Mostra a altura
let returnP = document.querySelector("#return"); //Botão de voltar 1 Pokémon
let advanceP = document.querySelector("#advance"); //Botão de avançar 1 Pokémon



//Background de tipos
let backType = document.getElementById("backType");


//Chama a música de fundo do HTML
const musicButton = document.getElementById("btnMusic"); //Botão para a Intro
const musicBack = document.getElementById("bgMusic"); //Música
const musicIcon = document.getElementById("iconMusic"); //Ícones de pausa e play


//Chama os icons dos tipos 
const tipoIcons = {
    grass: "./img/grass.png", //Tipo Grama
    poison: "./img/poison.png", //Tipo Veneno
    fire: "./img/fire.png", //Tipo Fogo
    water: "./img/water.png", //Tipo Água
    electric: "./img/electric.png", //Tipo Elétrico
    psychic: "./img/psychic.png", //Tipo Psíquico
    dark: "./img/tipos/dark.png", //Tipo Escuro
    steel: "./img/steel.png", //Tipo Aço
    rock: "./img/rock.png", //Tipo Pedra
    ice: "./img/ice.png", //Tipo Gelo
    fairy: "./img/fairy.png", //Tipo Fada
    fighting: "./img/fighting.png", //Tipo Lutador
    ghost: "./img/ghost.png", //Tipo Fantasma
    dragon: "./img/dragon.png", //Tipo Dragão
    ground: "./img/ground.png", //Tipo Chão/Terra
    bug: "./img/bug.png", //Tipo Inseto
    flying: "./img/flying.png", //Tipo Voador
    normal: "./img/normal.png", //Tipo Normal
};


//Define as cores de fundo das informações




let numeroPokedex = 1; //Define o pokémon para iniciar na Pokédex

//Link do PokeAPI com o JavaScript
const fetchPokemon = async (pokemon) => {
    const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const data = await APIresponse.json();
    return data;
};

//Mostra o pokémon na Pokédex, nome e ID
const showPokemon = async (pokemon) => {
    const dataPokemon = await fetchPokemon(pokemon);
    numeroPokedex = dataPokemon.id; //Altera o Pokémon de acordo com o ID mostrado

    segundaImagem(dataPokemon.sprites.other.showdown.front_default, dataPokemon.sprites.front_default);
    nomeP.innerHTML = dataPokemon.name; //Chama a funcion para trocar a imagem em caso de erro
    idP.innerHTML = dataPokemon.id + "|"; //Adiciona um "|" entre o ID e o nome do Pokémon

    //Verificar se há segundo tipo e adiciona ao seu respectivo icon
    tipo1P.innerHTML = `<img src="${tipoIcons[dataPokemon.types[0].type.name]}" class="icon-tipo"> ${dataPokemon.types[0].type.name}`; //Ao verificar o tipo 1, chama a class "icon-tipo" e adiciona um icon do tipo do Pokémon
    if (dataPokemon.types.length > 1) {
        tipo2P.innerHTML = `<img src="${tipoIcons[dataPokemon.types[1].type.name]}" class="icon-tipo"> ${dataPokemon.types[1].type.name}`; //Caso o Pokémon tiver mais de um tipo, fará a mesma coisa que o primeiro
    } else {
        tipo2P.innerHTML = ""; //Caso não tenha outro tipo, não colocará nada
    }


    habilidadeP.innerHTML = dataPokemon.abilities[0].ability.name; //Procura a habilidade 1 do Pokémon
    pesoP.innerHTML = (dataPokemon.weight / 10).toFixed(2) + "kg"; //Converte libras para quilos
    alturaP.innerHTML = (dataPokemon.height / 10).toFixed(2) + "m"; //Converte pés para metros

    //Altera o áudio para cada um dos Pokémons
    function playAudio(sound) { //Função para a troca de áudio
        sound = new Audio(sound);
        sound.play(); //Roda o áudio
    }
    playAudio(dataPokemon.cries.legacy); //Chama os áudios da PokéAPI



    //Altera a cor da descrição do Pokémon
    backType.className = "backType"; //define a classe backtype
    let tipoPrincipal = dataPokemon.types[0].type.name; //Puxa o tipo principal
    let tipoSecundario = dataPokemon.types[1]?.type.name; //Puxa o tipo secundário

    backType.classList.add(`back-${tipoPrincipal}`); //Atribui o valor da cor correspondente ao tipo principal para o backType pelo "back-nome"

    if (tipoSecundario) { //Se tiver tipo secundário, é atribuido o valor do tipo secundário
        backType.classList.add(`back-${tipoSecundario}`);
    }
    backType.style.background = `linear-gradient(to right, var(--${tipoPrincipal}), var(--${tipoSecundario || tipoPrincipal}))`; //Transforma o background em um gradiente linear com o tipo principal e secundário, se não tiver um tipo secundário, não há gradiente
};




//Caso a imagem com animação dê erro, será substituida por uma estática:
function segundaImagem(gif, image) {
    imgP.src = gif; //Imagem principa

    imgP.onerror = function () { //Caso a imagem principal dê erro, a function será ativada
        this.onerror = null; //Deleta a imagem com erro
        this.src = image; //Substitui por uma nova (estática)
    }
    return;
}



//Mostrar Pokémon
formP.addEventListener("submit", (event) => { //Function para mostrar o Pokémon
    event.preventDefault();
    showPokemon(inputF.value.toLowerCase()); //Altera a escrita do usuário para minúsculo a fim de evitar erros ao pesquisar
});


//Retornar
returnP.addEventListener("click", (event) => { //Function para fazer o botão retornar um Pokémon ao ser clicado
    if (numeroPokedex > 1) { //Caso o Pokémon tiver um ID maior que um
        numeroPokedex = numeroPokedex - 1; //O número da Pokédex será diminuído em 1
        showPokemon(numeroPokedex); //Mostra o Pokémon do respectivo número
    }
});

//Avançar
advanceP.addEventListener("click", (event) => { //Function para fazer o botão avançar um Pokémon ao ser clicado
    if (numeroPokedex < 1024) { //Caso o Pokémon tiver um ID menor que 1024
        numeroPokedex = numeroPokedex + 1; //O número da Pokédex será aumentado em 1
        showPokemon(numeroPokedex); //Mostra o Pokémon do respectivo número
    }
});

//Tocar música
let isPlaying = false; //Música inicia pausada

musicButton.addEventListener("click", () => { //Function para fazer o botão pausar/despausar a música ao ser clicado
    if (isPlaying) {
        musicBack.pause(); //Caso a música estiver rodando, pausará
        musicIcon.src = "https://cdn-icons-png.flaticon.com/512/1709/1709973.png"; //Altera o ícone exibido no botão
        musicButton.style = "background-color: rgb(14, 156, 14)"; //Altera a cor de fundo

    } else {
        musicBack.play(); //Caso a música estiver pausada, retornará de onde parou
        musicIcon.src = "https://cdn-icons-png.flaticon.com/512/4181/4181163.png"; //Altera o ícone exibido no botão
        musicButton.style = "background-color: rgb(216, 18, 18)"; //Altera a cor de fundo
    }
    isPlaying = !isPlaying; //Alterna o isPlaying entre true e false, fazendo pausar e despausar
});
