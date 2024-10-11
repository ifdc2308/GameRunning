const gameBoard = document.querySelector(".game-board"); //bg
const marioRun = document.querySelector(".marioRun");
const pipe = document.querySelector(".pipe");
const clouds = document.querySelector(".clouds");
const score = document.querySelector(".score");
const restart = document.querySelector(".restart");
const start = document.querySelector(".start");
const time = document.querySelector(".time");

// script.js

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

  characters.forEach((character) => {
    // Cria o elemento da imagem do personagem
    const characterImg = document.createElement("img");
    characterImg.classList.add("character");
    characterImg.src = character.image;
    characterImg.alt = `Personagem ${character.name}`;

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
    gameBoard.appendChild(healthBar);

    // Cria a lista de poderes
    const powersList = document.createElement("div");
    powersList.classList.add("powers-list", character.position);

    const powersTitle = document.createElement("h3");
    powersTitle.textContent = `Poderes de ${character.name}`;
    powersList.appendChild(powersTitle);

    const powersUl = document.createElement("ul");
    character.powers.forEach((power) => {
      const powerLi = document.createElement("li");
      powerLi.textContent = power;
      powersUl.appendChild(powerLi);
    });

    powersList.appendChild(powersUl);
    gameBoard.appendChild(powersList);
  });
}

// Chama a função para inicializar o jogo
initGame();
