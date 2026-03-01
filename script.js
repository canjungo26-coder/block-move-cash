let coins = 0;
const grid = document.getElementById("grid");
const coinsText = document.getElementById("coins");

for (let i = 0; i < 16; i++) {
  const block = document.createElement("div");
  block.classList.add("block");
  block.innerText = "⬛";

  block.onclick = () => {
    coins++;
    coinsText.innerText = coins;
    block.innerText = "💰";
    block.style.pointerEvents = "none";
  };

  grid.appendChild(block);
}

function levantar() {
  alert("Levantaste " + coins + " moedas 💰 (simulado)");
  coins = 0;
  coinsText.innerText = coins;
  document.querySelectorAll(".block").forEach(b => {
    b.innerText = "⬛";
    b.style.pointerEvents = "auto";
  });
  }
