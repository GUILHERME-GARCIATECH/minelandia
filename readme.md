Site para um servidor de rankup chamado MinLand
🌍 MineLandia — Website do Servidor Minecraft

Site oficial do servidor MineLandia, contendo landing page, sistema de ranking, perfil de jogadores, loja de VIP e integrações com o banco de dados MySQL do servidor.

---

📌 Visão Geral

O projeto é dividido em três partes principais:

- Frontend → Interface do usuário (HTML, CSS, JS)
- Backend → API e integração com banco (Node.js + Express)
- Database → Scripts SQL e consultas

---

🏗️ Estrutura do Projeto

minelandia/
│
├── frontend/ # Interface do site
│ ├── index.html # Página principal
│ ├── vip.html # Página de VIP/loja
│ ├── ranking.html # Ranking de jogadores
│ ├── player.html # Perfil de jogador
│ │
│ ├── css/
│ │ └── style.css
│ │
│ ├── js/
│ │ ├── main.js
│ │ ├── ranking.js
│ │ └── player.js
│ │
│ └── assets/
│ ├── images/
│ └── icons/
│
├── backend/ # Servidor Node.js (API)
│ ├── server.js # Arquivo principal
│ ├── package.json
│ │
│ ├── config/
│ │ └── db.js # Conexão com MySQL
│ │
│ ├── routes/
│ │ ├── ranking.js
│ │ ├── player.js
│ │ └── status.js
│ │
│ ├── controllers/
│ │ ├── rankingController.js
│ │ └── playerController.js
│ │
│ └── services/
│ └── queryService.js
│
├── database/ # Scripts SQL
│ ├── schema.sql
│ └── queries.sql
│
├── .gitignore
├── README.md
└── .env.example

---

⚙️ Tecnologias Utilizadas

Frontend

- HTML5
- CSS3
- JavaScript (Vanilla)

Backend

- Node.js
- Express.js

Banco de Dados

- MySQL

---

🚀 Como rodar o projeto

🔹 1. Clonar repositório

git clone https://github.com/seu-usuario/minelandia.git
cd minelandia

---

🔹 2. Configurar Backend

cd backend
npm install

Criar arquivo ".env" baseado no exemplo:

DB_HOST=localhost
DB_USER=root
DB_PASS=sua_senha
DB_NAME=seu_banco
PORT=3000

---

🔹 3. Rodar servidor

node server.js

Ou com nodemon:

npx nodemon server.js

---

🔹 4. Rodar frontend

Basta abrir:

frontend/index.html

ou usar uma extensão como Live Server.

---

🔌 Endpoints da API

📊 Ranking

GET /api/ranking

Retorna os top jogadores por dinheiro.

---

👤 Player

GET /api/player?nick=NomeDoPlayer

Retorna dados do jogador.

---

🟢 Status

GET /api/status

Retorna status do servidor Minecraft.

---

🧠 Roadmap do Projeto

✅ MVP (Inicial)

- Landing page
- Página VIP
- Ranking básico
- Status do servidor

🔄 Próximos passos

- Sistema de login
- Perfil completo do jogador
- Loja automática (VIP)
- Integração com pagamentos
- Painel administrativo

---

🔐 Segurança

- Nunca subir arquivos ".env"
- Não expor credenciais do banco
- Não reutilizar senha do Minecraft no site

---

🧑‍💻 Boas práticas

- Separar frontend e backend
- Organizar rotas e controllers
- Evitar código duplicado
- Commits pequenos e descritivos

---

📌 Observações

Este projeto foi desenvolvido com foco em simplicidade e evolução gradual. A estrutura pode ser expandida conforme o crescimento do servidor.

---

📄 Licença

Projeto privado — uso interno do servidor MineLandia.

IDENTIDADE VISUAL
🎯 Conceito Geral

A identidade visual do servidor é baseada em força, progresso e conquista, refletindo a jornada do jogador dentro de um sistema de rankup.
O estilo combina elementos de fantasia medieval com acabamento polido e moderno, transmitindo autoridade, evolução e competitividade.

O escudo representa proteção e status, enquanto as armas simbolizam progressão através de desafios.

🎨 Paleta de Cores
🟢 Verde Principal (Base)
Representa progresso, crescimento e evolução
Usado como cor dominante do escudo e fundo
Tons sugeridos:
Verde escuro: #1F3D2B
Verde médio: #2E6B4A
Verde claro (highlight): #4FA36C
🟡 Dourado (Destaque)
Representa status, conquista e prestígio
Usado na letra "M" e detalhes do escudo
Tons sugeridos:
Dourado base: #D4AF37
Dourado claro (brilho): #F1D27A
Dourado escuro (sombra): #A67C00
⚫ Fundo Escuro (Contraste)
Fundo neutro para destacar os elementos principais
Tons sugeridos:
Preto azulado: #0D1B1E
Cinza escuro: #1A1A1A
🔷 Azul/Prata (Detalhes secundários)
Pequenos elementos de contraste e refinamento
Usado em detalhes internos do escudo
Tons sugeridos:
Azul aço: #6C8EA4
Prata: #B0BEC5
🛡️ Elementos Visuais
🔰 Escudo
Elemento central da identidade
Forma sólida, simétrica, com aparência de “guilda” ou “clã”
Deve sempre transmitir:
Hierarquia
Proteção
Status
🔤 Letra Central (Monograma)
Letra "M" grande, robusta e tridimensional
Representa:
Nome do servidor (ou marca principal)
Autoridade
Estilo:
Bordas chanfradas
Efeito metálico (ouro)
Leve profundidade (quase 3D)
⚔️ Armas Cruzadas
Espada + picareta
Representam:
Combate (PvP)
Grind (mineração / progresso)
Devem sempre ficar:
Atrás do escudo
Em ângulo cruzado
Estilo semi-cartoon, mas polido
👑 Coroa
Pequeno detalhe acima da letra
Representa:
Top rank
Elite
Deve ser discreta, não competir com o "M"
✨ Estilo Visual
🔶 Acabamento
Semi-realista com toque estilizado
Sem exagero de textura “suja”
Aparência limpa e premium
💡 Iluminação
Luz suave vindo de cima
Brilho no dourado
Sombreamento leve para profundidade
🧱 Formas
Bordas suaves (não agressivas)
Volume leve (quase 3D)
Simetria bem definida
🔤 Tipografia
Fonte Principal (para títulos)
Estilo:
Medieval moderno OU gamer clean
Sugestões:
Cinzel
Trajan Pro
Orbitron (se quiser mais tech)
Fonte Secundária (texto/site)
Limpa e legível:
Inter
Poppins
Montserrat
🧩 Aplicações
📄 README / GitHub
Fundo escuro
Logo centralizada no topo
Uso de divisórias com ícones medievais
Destaques em dourado
🌐 Site
Hero com:
Fundo escuro + gradiente verde
Logo central
Botões:
Verde com hover dourado
Cards:
Bordas sutis douradas
📢 Banners
Fundo escuro com textura leve
Glow suave verde/dourado
Logo sempre em destaque central
🎮 Interface do servidor
Barras, HUD e menus:
Verde para progresso
Dourado para status/rank
Ícones baseados em:
Escudo, espada, coroa
🧭 Diretrizes de Uso
✅ Fazer
Manter contraste alto (escuro vs dourado/verde)
Usar iluminação suave
Preservar hierarquia visual (escudo > letra > detalhes)
❌ Evitar
Cores neon exageradas
Estilo cartoon infantil
Misturar muitas cores fora da paleta
Flatten total (perder o efeito premium)
🧠 Personalidade da Marca
🛡️ Forte
🏆 Competitiva
📈 Progressiva
⚔️ Estratégica
👑 Prestigiada
