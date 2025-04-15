alert("Bem vindos a interatividade turma 24-1T");

var titulo = document.querySelector("#titulo");
titulo.textContent = "Novo Texto";
titulo.style.color = "red";

function mostraAlerta() {
    alert("Funciona!")
}
function mostraTexto(texto) {
    alert(texto);
}
titulo.onclick = mostraTexto("Feliz Páscoa!");
