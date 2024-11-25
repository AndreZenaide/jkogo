const player = document.getElementById('player');
const target = document.getElementById('target');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');

let score = 0;
let timeLeft = 30;
let playerSpeed = 10;

// Posicionar o jogador no centro
let playerX = 300;
let playerY = 200;

// Gerar posição aleatória para o alvo
function moveTarget() {
  const targetX = Math.random() * (600 - 20); // Largura do game-area menos o tamanho do alvo
  const targetY = Math.random() * (400 - 20); // Altura do game-area menos o tamanho do alvo
  target.style.left = `${targetX}px`;
  target.style.top = `${targetY}px`;
}

// Atualizar posição do jogador
function updatePlayerPosition() {
  player.style.left = `${playerX}px`;
  player.style.top = `${playerY}px`;
}

// Checar colisão entre jogador e alvo
function checkCollision() {
  const playerRect = player.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();

  if (
    playerRect.left < targetRect.right &&
    playerRect.right > targetRect.left &&
    playerRect.top < targetRect.bottom &&
    playerRect.bottom > targetRect.top
  ) {
    score++;
    scoreDisplay.textContent = score;
    moveTarget();
  }
}

// Controlar o movimento do jogador com o teclado
document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowUp':
      playerY = Math.max(0, playerY - playerSpeed);
      break;
    case 'ArrowDown':
      playerY = Math.min(400 - 30, playerY + playerSpeed); // Limite inferior
      break;
    case 'ArrowLeft':
      playerX = Math.max(0, playerX - playerSpeed);
      break;
    case 'ArrowRight':
      playerX = Math.min(600 - 30, playerX + playerSpeed); // Limite direito
      break;
  }
  updatePlayerPosition();
  checkCollision();
});

// Iniciar o cronômetro
const timer = setInterval(() => {
  timeLeft--;
  timerDisplay.textContent = timeLeft;

  if (timeLeft <= 0) {
    clearInterval(timer);
    alert(`Fim de jogo! Sua pontuação final foi: ${score}`);
    location.reload(); // Reiniciar o jogo
  }
}, 1000);

// Configuração inicial
moveTarget();
updatePlayerPosition();
