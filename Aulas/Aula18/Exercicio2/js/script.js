let namePessoas = "";

let paragrafo = document.getElementById("demo");

fetch("./JSON/pessoas.json")

    .then(response => response.json())
    .then(listaNomes => {
        listaNomes.pessoas.forEach((listaNomes, Index) => {
            namePessoas = listaNomes.nome
            paragrafo.innerHTML += "Usuário n" + (Index + 1) + " registrados: " + namePessoas + "<br>";



        });

    })