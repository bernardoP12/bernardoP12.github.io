let contador = 0;

function adicionar() {
  contador = contador + 1;
  document.getElementById("contador").textContent = contador;
}

function mudarCor() {
  document.getElementById("cabecalho").style.backgroundColor = "orange";
}

function entrarTexto() {
  let texto = document.getElementById("texto");
  texto.textContent = "O rato está aqui!";
  texto.style.color = "red";
}

function sairTexto() {
  let texto = document.getElementById("texto");
  texto.textContent = "Passa o rato por cima desta frase.";
  texto.style.color = "black";
}

function mostrarPosicao(evento) {
  document.getElementById("caixa").textContent =
    "X: " + evento.offsetX + " Y: " + evento.offsetY;
}
