// declaração de variáveis
const nodeInputNumero = document.querySelector(
  "#colecao ~ section input[type=number]",
);
// eslint-disable-next-line no-unused-vars
const nodeInputSubmit = document.querySelector("#colecao ~ section button");
const nodeUlColecao = document.querySelector("#colecao ul");
const nodeTotal = document.querySelector("#colecao h3 span");
const nodeUlRepetidos = document.querySelector("#repetidos ul");
const nodeTotalRepetidos = document.querySelector("#repetidos h3 span");
const form = document.querySelector("#colecao ~ section form");
const colecao = JSON.parse(localStorage.getItem("colecao")) || [];
const repetidos = JSON.parse(localStorage.getItem("repetidos")) || [];
let totalRepetidos = repetidos.length;

// B. event handlers
function guardaDados() {
  localStorage.setItem("colecao", JSON.stringify(colecao));
  localStorage.setItem("repetidos", JSON.stringify(repetidos));
}

function atualizaLista(lista, nodeUl) {
  nodeUl.textContent = "";
  lista.forEach((numero) => {
    const nodeLi = document.createElement("li");
    if (lista === repetidos) {
      nodeLi.innerHTML = numero + ' <button type="button">eliminar</button>';
    } else {
      nodeLi.textContent = numero;
    }
    nodeUl.appendChild(nodeLi);
  });
  if (lista === repetidos) {
    ligaBotoesEliminar();
  }
}

function guardaCarta() {
  const numero = Number(nodeInputNumero.value);
  if (colecao.includes(numero)) {
    repetidos.push(numero);
    repetidos.sort((a, b) => a - b);
    totalRepetidos = totalRepetidos + 1;
    atualizaLista(repetidos, nodeUlRepetidos);
    nodeTotalRepetidos.textContent = totalRepetidos;
  } else {
    colecao.push(numero);
    colecao.sort((a, b) => a - b);
    atualizaLista(colecao, nodeUlColecao);
    nodeTotal.textContent = colecao.length;
  }
  guardaDados();
}

// C. event listeners
form.onsubmit = (event) => {
  event.preventDefault();
  guardaCarta();
};

function ligaBotoesEliminar() {
  nodeUlRepetidos.querySelectorAll("button").forEach((botao, indice) => {
    botao.addEventListener("click", () => {
      repetidos.splice(indice, 1);
      totalRepetidos = totalRepetidos - 1;
      guardaDados();
      atualizaLista(repetidos, nodeUlRepetidos);
      nodeTotalRepetidos.textContent = totalRepetidos;
    });
  });
}

// D. carregar dados guardados
atualizaLista(colecao, nodeUlColecao);
nodeTotal.textContent = colecao.length;
atualizaLista(repetidos, nodeUlRepetidos);
nodeTotalRepetidos.textContent = totalRepetidos;
