// A. Estado e Variáveis
const API = "https://deisishop.pw.deisi.ulusofona.pt";
const URL_PRODUTOS = API + "/products";
const URL_CATEGORIAS = API + "/categories";
const URL_COMPRAR = API + "/buy";

const nodeDivProdutos = document.querySelector("#lista");
const nodeDivCesto = document.querySelector("#cesto-lista");
const nodeTotal = document.querySelector("#total");
const nodeCategoria = document.querySelector("#categoria");
const nodeOrdem = document.querySelector("#ordem");
const nodePesquisa = document.querySelector("#pesquisa");
const nodeEstudante = document.querySelector("#estudante");
const nodeCupao = document.querySelector("#cupao");
const nodeComprar = document.querySelector("#comprar");
const nodeResultado = document.querySelector("#resultado");

let todosProdutos = [];

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

  const imagem = document.createElement("img");
  imagem.src = produto.image;
  imagem.alt = produto.title;

  const titulo = document.createElement("h2");
  titulo.textContent = produto.title;

  const descricao = document.createElement("p");
  descricao.textContent = produto.description;

  const preco = document.createElement("p");
  preco.textContent = "Preço: " + produto.price;

  const rating = document.createElement("p");
  rating.textContent = "Rating: " + Object.values(produto.rating).join(" / ");

  const botao = document.createElement("button");
  botao.type = "button";
  botao.textContent = "+ Adicionar ao cesto";
  botao.addEventListener("click", () => {
    const lista = lerCesto();
    lista.push(produto);
    guardarCesto(lista);
    atualizaCesto();
  });

  article.append(imagem, titulo, descricao, preco, rating, botao);
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
    const indice = lista.findIndex((p) => p.id === produto.id);
    lista.splice(indice, 1);
    guardarCesto(lista);
    atualizaCesto();
  });

  article.append(titulo, preco, botao);
  return article;
}

// C. Event handlers
function renderizarProdutos(produtos) {
  nodeDivProdutos.textContent = "";
  produtos.forEach((produto) => {
    nodeDivProdutos.append(criarProduto(produto));
  });
}

function aplicarFiltros() {
  const categoria = nodeCategoria.value;
  const texto = nodePesquisa.value.toLowerCase();
  const ordem = nodeOrdem.value;

  const lista = todosProdutos
    .filter((produto) => categoria === "" || produto.category === categoria)
    .filter((produto) => produto.title.toLowerCase().includes(texto));

  if (ordem === "crescente") {
    lista.sort((a, b) => Number(a.price) - Number(b.price));
  } else if (ordem === "decrescente") {
    lista.sort((a, b) => Number(b.price) - Number(a.price));
  }

  renderizarProdutos(lista);
}

function atualizaCesto() {
  const lista = lerCesto();
  let total = 0;
  nodeDivCesto.textContent = "";
  lista.forEach((produto) => {
    nodeDivCesto.append(criaProdutoCesto(produto));
    total = total + Number(produto.price);
  });
  nodeTotal.textContent = total.toFixed(2);
}

function comprar() {
  const ids = lerCesto().map((produto) => produto.id);

  fetch(URL_COMPRAR, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      products: ids,
      student: nodeEstudante.checked,
      coupon: nodeCupao.value,
      name: "",
    }),
  })
    .then((resposta) =>
      resposta.json().then((dados) => ({ ok: resposta.ok, dados })),
    )
    .then(({ ok, dados }) => {
      if (ok) {
        nodeResultado.textContent =
          "Referência: " +
          dados.reference +
          " | Total: " +
          dados.totalCost +
          " €";
      } else {
        nodeResultado.textContent = "Erro: " + dados.error;
      }
    })
    .catch(() => {
      nodeResultado.textContent = "Não foi possível finalizar a compra.";
    });
}

// D. Event Listeners
nodeCategoria.addEventListener("change", aplicarFiltros);
nodeOrdem.addEventListener("change", aplicarFiltros);
nodePesquisa.addEventListener("input", aplicarFiltros);
nodeComprar.addEventListener("click", comprar);

// E. Inicialização
fetch(URL_CATEGORIAS)
  .then((resposta) => resposta.json())
  .then((categorias) => {
    categorias.forEach((categoria) => {
      const opcao = document.createElement("option");
      opcao.value = categoria.name;
      opcao.textContent = categoria.name;
      nodeCategoria.append(opcao);
    });
  })
  .catch((erro) => console.error(erro));

fetch(URL_PRODUTOS)
  .then((resposta) => resposta.json())
  .then((dados) => {
    todosProdutos = dados;
    aplicarFiltros();
  })
  .catch(() => {
    nodeDivProdutos.textContent = "Não foi possível carregar os produtos.";
  });

atualizaCesto();
