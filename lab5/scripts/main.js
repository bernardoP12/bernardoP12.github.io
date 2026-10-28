let acoes = 0;
let total = 0;

function passar(texto) {
  texto.textContent = "Obrigado por passares!";
}

function pintar(cor) {
  document.getElementById("pinta").style.color = cor;
}

function escrever() {
  acoes = acoes + 1;
  if (acoes % 3 === 0) {
    document.getElementById("caixa").style.backgroundColor =
      "hsl(" + Math.random() * 360 + ", 100%, 75%)";
  }
}

function submeter() {
  document.body.style.backgroundColor = document.getElementById("cor").value;
}

function contar() {
  total = total + 1;
  document.getElementById("numero").textContent = total;
}
