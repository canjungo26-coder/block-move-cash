let coins = localStorage.getItem("coins") ? parseInt(localStorage.getItem("coins")) : 0;
let money = localStorage.getItem("money") ? parseFloat(localStorage.getItem("money")) : 0;
let level = localStorage.getItem("level") ? parseInt(localStorage.getItem("level")) : 1;

let dailyBonus = localStorage.getItem("dailyBonus");
let shareBonus = localStorage.getItem("shareBonus");

const grid = document.getElementById("grid");
const coinsText = document.getElementById("coins");
const moneyText = document.getElementById("money");
const levelText = document.getElementById("level");

coinsText.innerText = coins;
moneyText.innerText = money.toFixed(2);
levelText.innerText = level;

function salvar() {
  localStorage.setItem("coins", coins);
  localStorage.setItem("money", money);
  localStorage.setItem("level", level);
}

function atualizarTela() {
  coinsText.innerText = coins;
  moneyText.innerText = money.toFixed(2);
  levelText.innerText = level;
}

function criarBlocos() {
  grid.innerHTML = "";

  let total = 12 + (level * 4); // aumenta blocos por nível

  grid.style.gridTemplateColumns = "repeat(4, 70px)";

  for (let i = 0; i < total; i++) {
    const block = document.createElement("div");
    block.classList.add("block");
    block.innerText = "⬛";

    block.onclick = () => {
      coins++;

      if (coins >= 10) {
        coins -= 10;
        money += 50;
      }

      block.innerText = "💰";
      block.style.pointerEvents = "none";

      verificarNivel();
      salvar();
      atualizarTela();
    };

    grid.appendChild(block);
  }
}

function verificarNivel() {
  let blocos = document.querySelectorAll(".block");
  let todosAbertos = [...blocos].every(b => b.innerText === "💰");

  if (todosAbertos) {
    level++;

    let recompensa = 200 + (level * 50); // recompensa aumenta por nível
    money += recompensa;

    alert("Subiste para o nível " + level + " 🎉 +" + recompensa + " Kz");

    salvar();
    atualizarTela();
    criarBlocos();
  }
}

function bonusDiario() {
  let hoje = new Date().toDateString();

  if (dailyBonus !== hoje) {
    money += 100;
    dailyBonus = hoje;
    localStorage.setItem("dailyBonus", hoje);
    alert("Bónus diário 🎁 +100 Kz");
    salvar();
    atualizarTela();
  }
}

function bonusPartilha() {
  let hoje = new Date().toDateString();

  if (shareBonus !== hoje) {
    money += 50;
    shareBonus = hoje;
    localStorage.setItem("shareBonus", hoje);
    alert("Obrigado por partilhar 📲 +50 Kz");
    salvar();
    atualizarTela();
  } else {
    alert("Já recebeste o bónus de partilha hoje");
  }
}

function levantar() {
  if (money < 2500) {
    alert("Mínimo para levantar é 2.500 Kz");
    return;
  }

  alert("Levantamento de " + money.toFixed(2) + " Kz enviado 💸 (simulado)");
  money = 0;
  salvar();
  atualizarTela();
}

criarBlocos();
bonusDiario();
