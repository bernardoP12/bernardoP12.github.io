// A. Estado e variáveis com referência de elementos do DOM
const nodeDivProdutos = document.querySelector("#produtos div");
const nodeDivCesto = document.querySelector("#cesto div");
const nodeTotal = document.querySelector("#cesto h3 span");

if (!localStorage.getItem("produtos-selecionados")) {
  localStorage.setItem("produtos-selecionados", JSON.stringify([]));
}

// B. Funções utilitárias
function lerCesto() {
  return JSON.parse(localStorage.getItem("produtos-selecionados"));
}

function guardarCesto(lista) {
  localStorage.setItem("produtos-selecionados", JSON.stringify(lista));
}

function criarProduto(produto) {
  const article = document.createElement("article");

  const titulo = document.createElement("h2");
  titulo.textContent = produto.title;

  const descricao = document.createElement("p");
  descricao.textContent = produto.description;

  const preco = document.createElement("p");
  preco.textContent = "Preço: " + produto.price;

  const rating = document.createElement("p");
  rating.textContent = "Rating: " + produto.rating;

  const botao = document.createElement("button");
  botao.type = "button";
  botao.textContent = "+ Adicionar ao cesto";
  botao.addEventListener("click", () => {
    const lista = lerCesto();
    lista.push(produto);
    guardarCesto(lista);
    atualizaCesto();
  });

  article.append(titulo, descricao, preco, rating, botao);
  return article;
}

function criaProdutoCesto(produto) {
  const article = document.createElement("article");

  const titulo = document.createElement("h2");
  titulo.textContent = produto.title;

  const preco = document.createElement("p");
  preco.textContent = "Preço: " + produto.price;

  const botao = document.createElement("button");
  botao.type = "button";
  botao.textContent = "Remover";
  botao.addEventListener("click", () => {
    const lista = lerCesto();
    const indice = lista.findIndex((p) => p.title === produto.title);
    lista.splice(indice, 1);
    guardarCesto(lista);
    atualizaCesto();
  });

  article.append(titulo, preco, botao);
  return article;
}

// C. Event handlers
function renderizarProdutos(produtos) {
  produtos.forEach((produto) => {
    nodeDivProdutos.append(criarProduto(produto));
  });
}

function atualizaCesto() {
  const lista = lerCesto();
  let total = 0;
  nodeDivCesto.textContent = "";
  lista.forEach((produto) => {
    nodeDivCesto.append(criaProdutoCesto(produto));
    total = total + produto.price;
  });
  nodeTotal.textContent = total.toFixed(2);
}

// D. Event Listeners

// E. Inicialização
renderizarProdutos(produtos);
atualizaCesto();
