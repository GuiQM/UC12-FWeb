function validaBusca() {
    if (document.querySelector("#inputlupa").value == "") {
        alert("Não deixe a busca em branco!");
        return false;
    }
}

//Fazendo a associação da função com o evento
document.querySelector("#form-busca").onsubmit = validaBusca;