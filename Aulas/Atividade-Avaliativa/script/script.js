let input = document.querySelector('#inputText')

textValue = "";

function apagar()   {
    alert("Mensagem enviada ao suporte!");
    textValue = "";
    updateText();
}


function updateText() {
    input.value = textValue;
}
