const serverData = {
    stats: {
        playersOnline: 35,
        activeClans: 12,
        moneyCirculating: 8450000
    },
    season: {
        name: "Rei de Neve",
        description: "O rei gelado ataca novamente."
    },
    nextEvent: {
        title: "Cerco ao Castelo",
        description: "Prepare seu clã para uma batalha valendo recompensas exclusivas."
    }
};

function formatMoney(value) {
    return new Intl.NumberFormat("pt-BR", {
        notation: "compact",
        compactDisplay: "short"
    }).format(value);
}

function setText(selector, value) {
    const element = document.querySelector(selector);

    if (!element) {
        console.warn(`Elemento não encontrado: ${selector}`);
        return;
    }

    element.textContent = value;
}

function renderHome(data) {
    setText("#players-online", data.stats.playersOnline);
    setText(".players-online", data.stats.playersOnline);
    setText(".active-clans", data.stats.activeClans);
    setText(".money-circulating", formatMoney(data.stats.moneyCirculating));

    setText("#current-season", data.season.name);
    setText("#season-description", data.season.description);

    setText("#next-event-title", data.nextEvent.title);
    setText("#next-event-description", data.nextEvent.description);
}

renderHome(serverData);

document.querySelector(".btn-copiar").addEventListener("click", () => {
  navigator.clipboard.writeText("SEU-IP-AQUI");
});