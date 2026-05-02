const serverData = {
  stats: {
    playersOnline: 35,
    activeClans: 12,
    moneyCirculating: 8450000,
  },
  season: {
    name: "Rei de Neve",
    description: "O rei gelado ataca novamente.",
  },
  nextEvent: {
    title: "Cerco ao Castelo",
    description: "Prepare seu cl\u00e3 para uma batalha valendo recompensas exclusivas.",
  },
};

const formatMoney = (value) =>
  new Intl.NumberFormat("pt-BR", {
    notation: "compact",
    compactDisplay: "short",
  }).format(value);

function setText(selector, value) {
  const elements = document.querySelectorAll(selector);

  if (elements.length === 0) {
    console.warn(`Elemento n\u00e3o encontrado: ${selector}`);
    return;
  }

  elements.forEach((element) => {
    element.textContent = value;
  });
}

function renderHome(data) {
  const homeFields = {
    "#players-online": data.stats.playersOnline,
    ".players-online": data.stats.playersOnline,
    ".active-clans": data.stats.activeClans,
    ".money-circulating": formatMoney(data.stats.moneyCirculating),
    "#current-season": data.season.name,
    "#season-description": data.season.description,
    "#next-event-title": data.nextEvent.title,
    "#next-event-description": data.nextEvent.description,
  };

  Object.entries(homeFields).forEach(([selector, value]) => {
    setText(selector, value);
  });
}

function setupCopyIpButton() {
  const copyButton = document.querySelector("[data-copy-ip]");

  if (!copyButton) {
    return;
  }

  const serverIp = copyButton.dataset.copyIp;
  const defaultLabel = copyButton.textContent;

  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(serverIp);
      copyButton.textContent = "IP copiado!";
    } catch (error) {
      console.warn("N\u00e3o foi poss\u00edvel copiar o IP automaticamente.", error);
      copyButton.textContent = serverIp;
    }

    window.setTimeout(() => {
      copyButton.textContent = defaultLabel;
    }, 1800);
  });
}

renderHome(serverData);
setupCopyIpButton();
