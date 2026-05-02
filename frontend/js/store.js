const produtos = window.MINELANDIA_PRODUCTS || {};
const storage = window.MineLandiaStorage;

let itemAtual = null;
let carrinho = storage ? storage.getCartItems() : [];

function getProduct(id) {
  const produto = produtos[id];

  if (!produto) {
    console.error("Produto nao encontrado:", id);
  }

  return produto;
}

function createCartItemElement(item) {
  const cartItem = document.createElement("div");
  cartItem.className = "cart-item";

  const itemInfo = document.createElement("div");
  itemInfo.className = "cart-item-info";

  const itemName = document.createElement("span");
  itemName.textContent = item.product.nome;

  const itemQuantity = document.createElement("small");
  itemQuantity.textContent = `${item.quantity}x no carrinho`;

  const itemActions = document.createElement("div");
  itemActions.className = "cart-item-actions";

  const itemPrice = document.createElement("strong");
  itemPrice.textContent = storage.formatPrice(item.lineTotal);

  const removeButton = document.createElement("button");
  removeButton.className = "cart-remove-button";
  removeButton.type = "button";
  removeButton.dataset.action = "remove-from-cart";
  removeButton.dataset.productId = item.id;
  removeButton.textContent = "Remover";

  itemInfo.append(itemName, itemQuantity);
  itemActions.append(itemPrice, removeButton);
  cartItem.append(itemInfo, itemActions);

  return cartItem;
}

function renderCart() {
  const cartItems = document.getElementById("cart-items");
  const emptyMessage = document.getElementById("cart-empty-message");
  const subtotalElement = document.getElementById("cart-subtotal");
  const totalElement = document.getElementById("cart-total");

  if (!storage || !cartItems || !emptyMessage || !subtotalElement || !totalElement) {
    return;
  }

  const cartDetails = storage.getCartDetails(carrinho);

  cartItems.innerHTML = "";

  if (cartDetails.items.length === 0) {
    emptyMessage.classList.remove("hidden");
  } else {
    emptyMessage.classList.add("hidden");
    cartDetails.items.forEach((item) => {
      cartItems.appendChild(createCartItemElement(item));
    });
  }

  subtotalElement.textContent = storage.formatPrice(cartDetails.subtotal);
  totalElement.textContent = storage.formatPrice(cartDetails.total);
}

function openModal(id) {
  const produto = getProduct(id);
  const modal = document.getElementById("product-modal");
  const benefits = document.getElementById("modal-product-benefits");
  const addButton = document.getElementById("modal-add-cart");
  const buyButton = document.getElementById("modal-buy-now");

  if (!produto || !modal || !benefits || !addButton || !buyButton || !storage) {
    return;
  }

  itemAtual = id;

  document.getElementById("modal-product-name").textContent = produto.nome;
  document.getElementById("modal-product-description").textContent = produto.descricao;
  document.getElementById("modal-product-price").textContent = storage.formatPrice(produto.preco);

  benefits.innerHTML = "";
  produto.beneficios.forEach((beneficio) => {
    const item = document.createElement("li");
    item.textContent = beneficio;
    benefits.appendChild(item);
  });

  addButton.dataset.productId = id;
  buyButton.dataset.productId = id;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  const modal = document.getElementById("product-modal");

  if (!modal) {
    return;
  }

  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
}

function addToCart(id = itemAtual) {
  const produto = getProduct(id);

  if (!produto || !storage) {
    return;
  }

  carrinho = storage.addCartItem(id);
  renderCart();
  closeModal();
}

function removeFromCart(id) {
  if (!storage) {
    return;
  }

  carrinho = storage.removeCartItem(id);
  renderCart();
}

function clearCart() {
  if (!storage) {
    return;
  }

  carrinho = storage.clearCartItems();
  renderCart();
}

function buyNow(id = itemAtual) {
  addToCart(id);
  window.location.href = "checkout.html";
}

// Integracao futura: enviar IDs e quantidades para o backend validar produtos e precos.
document.addEventListener("click", (event) => {
  const actionTarget = event.target.closest("[data-action]");

  if (!actionTarget) {
    return;
  }

  const { action, productId } = actionTarget.dataset;

  if (action === "open-product") {
    openModal(productId);
  }

  if (action === "add-to-cart") {
    addToCart(productId || itemAtual);
  }

  if (action === "remove-from-cart") {
    removeFromCart(productId);
  }

  if (action === "buy-now") {
    buyNow(productId || itemAtual);
  }

  if (action === "clear-cart") {
    clearCart();
  }

  if (action === "close-product") {
    closeModal();
  }
});

document.getElementById("product-modal")?.addEventListener("click", (event) => {
  if (event.target.id === "product-modal") {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});

renderCart();
