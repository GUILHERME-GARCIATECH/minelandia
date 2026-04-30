const produtos = {
  vip: {
    nome: "VIP",
    preco: 9.9,
    descricao: "Benefícios iniciais do reino medieval.",
  },
  vipplus: {
    nome: "VIP+",
    preco: 19.9,
    descricao: "Mais comandos, vantagens e destaque no servidor.",
  },
  mvp: {
    nome: "MVP",
    preco: 29.9,
    descricao: "Rank avançado com perks exclusivos.",
  },
  mvpplus: {
    nome: "MVP+",
    preco: 49.9,
    descricao: "Elite do reino com benefícios máximos.",
  },
};

let itemAtual = null;
let carrinho = [];

function openModal(id) {
  const produto = produtos[id];

  if (!produto) {
    console.error("Produto não encontrado:", id);
    return;
  }

  itemAtual = id;

  document.getElementById("nome").innerText = produto.nome;
  document.getElementById("preco").innerText = produto.preco;

  document.getElementById("modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

function addToCart(id) {
  const produto = produtos[id];

   if (!produto) {
    console.error("Produto não encontrado:", id);
    return;
  }

  carrinho.push(produto);
  console.log("Carrinho: ", carrinho);

  closeModal();
}
