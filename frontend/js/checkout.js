const checkoutStorage = window.MineLandiaStorage;

const customerFields = {
  nick: document.getElementById("player-nick"),
  name: document.getElementById("customer-name"),
  email: document.getElementById("customer-email"),
  discord: document.getElementById("customer-discord"),
};

function createCheckoutItemElement(item) {
  const cartItem = document.createElement("div");
  cartItem.className = "cart-item";

  const itemInfo = document.createElement("div");
  itemInfo.className = "cart-item-info";

  const itemName = document.createElement("span");
  itemName.textContent = item.product.nome;

  const itemQuantity = document.createElement("small");
  itemQuantity.textContent = `${item.quantity}x no pedido`;

  const itemActions = document.createElement("div");
  itemActions.className = "cart-item-actions";

  const itemPrice = document.createElement("strong");
  itemPrice.textContent = checkoutStorage.formatPrice(item.lineTotal);

  const removeButton = document.createElement("button");
  removeButton.className = "cart-remove-button";
  removeButton.type = "button";
  removeButton.dataset.action = "remove-checkout-item";
  removeButton.dataset.productId = item.id;
  removeButton.textContent = "Remover";

  itemInfo.append(itemName, itemQuantity);
  itemActions.append(itemPrice, removeButton);
  cartItem.append(itemInfo, itemActions);

  return cartItem;
}

function renderCheckoutSummary() {
  const itemsElement = document.getElementById("checkout-items");
  const subtotalElement = document.getElementById("checkout-subtotal");
  const totalElement = document.getElementById("checkout-total");

  if (!checkoutStorage || !itemsElement || !subtotalElement || !totalElement) {
    return;
  }

  const cartDetails = checkoutStorage.getCartDetails();
  itemsElement.innerHTML = "";

  if (cartDetails.items.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "cart-empty-message";
    emptyMessage.textContent = "Nenhum item carregado no checkout.";
    itemsElement.appendChild(emptyMessage);
  } else {
    cartDetails.items.forEach((item) => {
      itemsElement.appendChild(createCheckoutItemElement(item));
    });
  }

  subtotalElement.textContent = checkoutStorage.formatPrice(cartDetails.subtotal);
  totalElement.textContent = checkoutStorage.formatPrice(cartDetails.total);
}

function getCustomerFormData() {
  return {
    nick: customerFields.nick?.value || "",
    name: customerFields.name?.value || "",
    email: customerFields.email?.value || "",
    discord: customerFields.discord?.value || "",
  };
}

function fillCustomerForm() {
  if (!checkoutStorage) {
    return;
  }

  const savedCustomer = checkoutStorage.getCustomerData();

  Object.entries(customerFields).forEach(([fieldName, element]) => {
    if (element) {
      element.value = savedCustomer[fieldName] || "";
    }
  });
}

function saveCustomerForm() {
  if (!checkoutStorage) {
    return;
  }

  checkoutStorage.saveCustomerData(getCustomerFormData());
}

function setupCustomerPersistence() {
  Object.values(customerFields).forEach((element) => {
    element?.addEventListener("input", saveCustomerForm);
  });
}

function setupCheckoutActions() {
  document.addEventListener("click", (event) => {
    const actionTarget = event.target.closest("[data-action]");

    if (!checkoutStorage || !actionTarget || actionTarget.dataset.action !== "remove-checkout-item") {
      return;
    }

    checkoutStorage.removeCartItem(actionTarget.dataset.productId);
    renderCheckoutSummary();
  });

  document.querySelector(".checkout-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    saveCustomerForm();
    console.info("Pedido pronto para integracao futura com pagamento e backend.");
  });
}

if (checkoutStorage) {
  renderCheckoutSummary();
  fillCustomerForm();
  setupCustomerPersistence();
  setupCheckoutActions();
} else {
  console.warn("Camada de armazenamento da MineLandia nao foi carregada.");
}
