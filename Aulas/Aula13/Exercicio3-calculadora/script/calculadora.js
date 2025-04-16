let input = document.querySelector("#inputText");

let textValue = "";


function addNumber(number)  {
    textValue += number;
    updateText();
}


function addOperator(operator)  {
    textValue += operator;
    updateText();
}

function addDecimal()   {
    textValue += ".";
    updateText();
}

function clearText()    {
    textValue = "";
    updateText();
}

function updateText()   {
    input.value = textValue;
}

function calculate()    {
    textValue = eval(textValue);
    updateText();
}