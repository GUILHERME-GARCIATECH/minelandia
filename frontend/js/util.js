(function () {
  const CART_KEY = "minelandia.cart.v1";
  const CUSTOMER_KEY = "minelandia.customer.v1";

  const PRODUCTS = {
    vip: {
      nome: "VIP",
      preco: 9.9,
      descricao: "Benef\u00edcios iniciais para come\u00e7ar com mais conforto no reino medieval.",
      beneficios: ["Kit VIP semanal", "Tag exclusiva no chat", "Comandos b\u00e1sicos extras"],
    },
    vipplus: {
      nome: "VIP+",
      preco: 19.9,
      descricao: "Mais comandos, recompensas e destaque para acelerar sua progress\u00e3o.",
      beneficios: ["Kit VIP+ semanal", "Homes adicionais", "B\u00f4nus de cash inicial"],
    },
    mvp: {
      nome: "MVP",
      preco: 29.9,
      descricao: "Rank avan\u00e7ado para jogadores que querem dominar a temporada.",
      beneficios: ["Kit MVP refor\u00e7ado", "Prioridade em eventos", "Comandos de conveni\u00eancia"],
    },
    mvpplus: {
      nome: "MVP+",
      preco: 49.9,
      descricao: "Pacote de elite com os maiores benef\u00edcios ativos do reino.",
      beneficios: ["Kit MVP+ premium", "Maior destaque visual", "Benef\u00edcios m\u00e1ximos ativos"],
    },
    "cash-1000": {
      nome: "1.000 Cash",
      preco: 5,
      descricao: "Um impulso r\u00e1pido para pequenas compras e melhorias.",
      beneficios: ["Cr\u00e9dito em conta", "Uso livre na economia", "Entrega autom\u00e1tica futura"],
    },
    "cash-5000": {
      nome: "5.000 Cash",
      preco: 20,
      descricao: "Boa reserva para evoluir equipamentos, terrenos e recursos.",
      beneficios: ["Melhor custo por cash", "Ideal para evolu\u00e7\u00e3o", "Saldo pronto para loja"],
    },
    "cash-10000": {
      nome: "10.000 Cash",
      preco: 35,
      descricao: "Pacote robusto para dominar a economia da temporada.",
      beneficios: ["Maior economia", "Perfeito para cl\u00e3s", "Mais liberdade de compra"],
    },
    unban: {
      nome: "Unban",
      preco: 25,
      descricao: "Solicita\u00e7\u00e3o de revis\u00e3o manual para retorno ao servidor.",
      beneficios: ["An\u00e1lise da equipe", "Resposta via suporte", "Processo manual"],
    },
    reset: {
      nome: "Reset",
      preco: 5,
      descricao: "Rein\u00edcio de dados espec\u00edficos da conta mediante solicita\u00e7\u00e3o.",
      beneficios: ["Atendimento individual", "Revis\u00e3o antes da execu\u00e7\u00e3o", "Confirma\u00e7\u00e3o no Discord"],
    },
    fly: {
      nome: "Voar",
      preco: 5,
      descricao: "Permiss\u00e3o de voo para construir e explorar com mais liberdade.",
      beneficios: ["Permiss\u00e3o /fly", "Ideal para builds", "Ativa\u00e7\u00e3o ap\u00f3s confirma\u00e7\u00e3o"],
    },
  };

  const formatPrice = (value) =>
    Number(value).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  function readJson(key, fallback) {
    try {
      const rawValue = localStorage.getItem(key);
      return rawValue ? JSON.parse(rawValue) : fallback;
    } catch (error) {
      console.warn("Nao foi possivel ler dados salvos.", error);
      return fallback;
    }
  }

  function writeJson(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn("Nao foi possivel salvar dados localmente.", error);
    }
  }

  function normalizeQuantity(value) {
    const quantity = Number(value);

    if (!Number.isFinite(quantity) || quantity <= 0) {
      return 1;
    }

    return Math.floor(quantity);
  }

  function normalizeCart(items) {
    if (!Array.isArray(items)) {
      return [];
    }

    const groupedItems = new Map();

    items.forEach((item) => {
      const id = typeof item === "string" ? item : item?.id;

      if (!id || !PRODUCTS[id]) {
        return;
      }

      const quantity = normalizeQuantity(item?.quantity);
      groupedItems.set(id, (groupedItems.get(id) || 0) + quantity);
    });

    return Array.from(groupedItems, ([id, quantity]) => ({ id, quantity }));
  }

  function getCartItems() {
    return normalizeCart(readJson(CART_KEY, []));
  }

  function saveCartItems(items) {
    const normalizedItems = normalizeCart(items);
    writeJson(CART_KEY, normalizedItems);
    return normalizedItems;
  }

  function addCartItem(id) {
    if (!PRODUCTS[id]) {
      return getCartItems();
    }

    const items = getCartItems();
    const existingItem = items.find((item) => item.id === id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      items.push({ id, quantity: 1 });
    }

    return saveCartItems(items);
  }

  function removeCartItem(id) {
    return saveCartItems(getCartItems().filter((item) => item.id !== id));
  }

  function clearCartItems() {
    try {
      localStorage.removeItem(CART_KEY);
    } catch (error) {
      console.warn("Nao foi possivel limpar o carrinho.", error);
    }

    return [];
  }

  function getCartDetails(items = getCartItems()) {
    const detailedItems = normalizeCart(items).map((item) => {
      const product = PRODUCTS[item.id];
      const lineTotal = product.preco * item.quantity;

      return {
        ...item,
        product,
        lineTotal,
      };
    });

    const subtotal = detailedItems.reduce((total, item) => total + item.lineTotal, 0);

    return {
      items: detailedItems,
      subtotal,
      total: subtotal,
    };
  }

  function sanitizeText(value) {
    return typeof value === "string" ? value.trim() : "";
  }

  function getCustomerData() {
    const data = readJson(CUSTOMER_KEY, {});

    return {
      nick: sanitizeText(data.nick),
      name: sanitizeText(data.name),
      email: sanitizeText(data.email),
      discord: sanitizeText(data.discord),
    };
  }

  function saveCustomerData(data) {
    const nextData = {
      ...getCustomerData(),
      nick: sanitizeText(data.nick),
      name: sanitizeText(data.name),
      email: sanitizeText(data.email),
      discord: sanitizeText(data.discord),
    };

    writeJson(CUSTOMER_KEY, nextData);
    return nextData;
  }

  window.MINELANDIA_PRODUCTS = PRODUCTS;
  window.MineLandiaStorage = {
    formatPrice,
    getCartItems,
    saveCartItems,
    addCartItem,
    removeCartItem,
    clearCartItems,
    getCartDetails,
    getCustomerData,
    saveCustomerData,
  };
})();
