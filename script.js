// Função para carregar o JSON
async function loadCharacters() {
    const response = await fetch("characters.json");
    const data = await response.json();
    return data.characters;
}

// Função para inicializar o jogo com os dados do JSON
async function initGame() {
    const characters = await loadCharacters();

    // Seleciona a game board
    const gameBoard = document.querySelector(".game-board");
    const startButton = document.querySelector(".start-button");
    const restartButton = document.querySelector(".restart");
    let healthBars = {};

    // Cria os personagens dinamicamente
    characters.forEach((character) => {
        // Cria o elemento da imagem do personagem
        const characterImg = document.createElement("img");
        characterImg.classList.add("character");
        characterImg.src = character.image;
        characterImg.alt = `Personagem ${character.name}`;
        characterImg.dataset.name = character.name; // Atribuir o nome para referência

        // Define a posição (esquerda ou direita)
        characterImg.classList.add(character.position);

        // Adiciona o personagem ao game board
        gameBoard.appendChild(characterImg);

        // Cria a barra de vida
        const healthBar = document.createElement("div");
        healthBar.classList.add("health-bar", character.position);

        const healthFill = document.createElement("div");
        healthFill.classList.add("health-fill");
        healthFill.style.width = `${character.health}%`;
        healthBar.appendChild(healthFill);

        // Salva a referência da barra de vida para cada personagem
        healthBars[character.name] = healthFill;

        gameBoard.appendChild(healthBar);
    });

    // Função para executar um ataque aleatório
    function executeAttack(attacker, defender) {
        // Seleciona um ataque aleatório do atacante
        const attack = attacker.powers[Math.floor(Math.random() * attacker.powers.length)];
        console.log(`${attacker.name} usou ${attack}!`);

        // Reduz a saúde do defensor de forma aleatória
        const damage = Math.floor(Math.random() * 20) + 5;
        defender.health -= damage;
        if (defender.health < 0) defender.health = 0;

        // Atualiza a barra de vida do defensor
        healthBars[defender.name].style.width = `${defender.health}%`;

        // Animação de vibração no personagem atingido
        const defenderImg = document.querySelector(`img[data-name="${defender.name}"]`);
        defenderImg.classList.add("vibrate");
        setTimeout(() => {
            defenderImg.classList.remove("vibrate");
        }, 300);

        // Verifica se o jogo terminou
        if (defender.health <= 0) {
            endGame(attacker.name);
        }
    }

    // Função para iniciar a batalha
    function startBattle() {
        let turn = 0; // Alterna entre os personagens

        const battleInterval = setInterval(() => {
            const attacker = characters[turn % 2];
            const defender = characters[(turn + 1) % 2];

            executeAttack(attacker, defender);

            turn++;

            // Para o intervalo se o jogo terminar
            if (defender.health <= 0) {
                clearInterval(battleInterval);
            }
        }, 1000);
    }

    // Função para encerrar o jogo
    function endGame(winner) {
        document.querySelector(".game-over").textContent = `${winner} venceu!`;
        document.querySelector(".restart").style.display = "block";
    }

    // Evento para iniciar a batalha
    startButton.addEventListener("click", () => {
        startButton.style.display = "none";
        startBattle();
    });
}

// Chama a função para inicializar o jogo
initGame();
