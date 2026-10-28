/* eslint-disable no-unused-vars */
let acoes = 0;
let total = 0;
let contador = Number(localStorage.getItem("contador"));
let segundos = 0;

const passar = (texto) => {
  texto.textContent = "Obrigado por passares!";
};

const escrever = () => {
  acoes = acoes + 1;
  if (acoes % 3 === 0) {
    document.getElementById("caixa").style.backgroundColor =
      "hsl(" + Math.random() * 360 + ", 100%, 75%)";
  }
};

const mudarFundo = (seletor) => {
  document.body.style.backgroundColor = seletor.value;
};

const contar = () => {
  total = total + 1;
  document.getElementById("numero").textContent = total;
};

const mudarDirecao = (seletor) => {
  document.getElementById("container").style.flexDirection = seletor.value;
};

const atualizar = () => {
  localStorage.setItem("contador", contador);
  document.getElementById("valor").textContent = contador;
};

const incrementar = () => {
  contador = contador + 1;
  atualizar();
};

const decrementar = () => {
  contador = contador - 1;
  atualizar();
};

const reiniciar = () => {
  contador = 0;
  atualizar();
};

const submeterFormulario = (e) => {
  e.preventDefault();
  const nome = document.getElementById("nome").value;
  const idade = document.getElementById("idade").value;
  document.getElementById("mensagem").textContent =
    "Olá, o " + nome + " tem " + idade + "!";
};

const count = () => {
  segundos = segundos + 1;
  document.getElementById("tempo").textContent = segundos;
};

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("valor").textContent = contador;

  document.querySelectorAll("button.color").forEach((botao) => {
    botao.addEventListener("click", () => {
      document.getElementById("pinta").style.color = botao.dataset.color;
    });
  });

  document.getElementById("mais").addEventListener("click", incrementar);
  document.getElementById("menos").addEventListener("click", decrementar);
  document.getElementById("zero").addEventListener("click", reiniciar);

  document.querySelector("form").onsubmit = submeterFormulario;

  setInterval(count, 1000);
});
