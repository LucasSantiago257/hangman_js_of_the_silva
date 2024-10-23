const wordElement = document.getElementById('word');
const wrongLettersElement = document.getElementById('wrong-letters');
const livesElement = document.getElementById('lives');
const guessInput = document.getElementById('guess');
const guessWordInput = document.getElementById('guess-word');
const canvas = document.getElementById('hangman');
const context = canvas.getContext('2d');


const words = [
  'amor', 'amizade', 'carro', 'bicicleta', 'telefone', 'computador', 'escola', 'floresta', 'montanha', 'oceano',
  'cidade', 'praia', 'biblioteca', 'livro', 'casa', 'janela', 'porta', 'cadeira', 'mesa', 'chave',
  'sol', 'lua', 'estrela', 'planeta', 'céu', 'nuvem', 'chuva', 'vento', 'neve', 'relâmpago',
  'amarelo', 'azul', 'verde', 'vermelho', 'preto', 'branco', 'laranja', 'roxo', 'cinza', 'rosa',
  'futebol', 'basquete', 'corrida', 'natação', 'volei', 'tenis', 'ciclismo', 'ginástica', 'judô', 'karate',
  'cachorro', 'gato', 'pássaro', 'peixe', 'cavalo', 'vaca', 'ovelha', 'porco', 'galinha', 'coelho',
  'árvore', 'flor', 'grama', 'fruta', 'legume', 'verdura', 'sopa', 'salada', 'biscoito', 'bolo',
  'carne', 'frango', 'peixe', 'arroz', 'feijão', 'macarrão', 'pizza', 'sanduíche', 'hambúrguer', 'batata',
  'escritório', 'trabalho', 'empresa', 'loja', 'mercado', 'farmácia', 'restaurante', 'lanchonete', 'shopping', 'cinema',
  'viagem', 'feriado', 'festa', 'aniversário', 'casamento', 'evento', 'congresso', 'palestra', 'show', 'teatro'
];

let word = words[Math.floor(Math.random() * words.length)];

let guessedLetters = [];
let wrongLetters = [];
let lives = 6;
let gameOver = false;

function displayWord() {
  wordElement.innerHTML = word
    .split('')
    .map(letter => guessedLetters.includes(letter) ? letter : '_')
    .join(' ');
}

function drawHangman() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  
  if (lives <= 5) {
    // Base
    context.beginPath();
    context.moveTo(10, 290);
    context.lineTo(190, 290);
    context.stroke();
  }
  if (lives <= 4) {
    // Poste
    context.beginPath();
    context.moveTo(50, 290);
    context.lineTo(50, 50);
    context.lineTo(150, 50);
    context.lineTo(150, 100);
    context.stroke();
  }
  if (lives <= 3) {
    // Cabeça
    context.beginPath();
    context.arc(150, 130, 30, 0, Math.PI * 2, true);
    context.stroke();
  }
  if (lives <= 2) {
    // Corpo
    context.beginPath();
    context.moveTo(150, 160);
    context.lineTo(150, 230);
    context.stroke();
  }
  if (lives <= 1) {
    // Braços
    context.beginPath();
    context.moveTo(150, 180);
    context.lineTo(120, 210);
    context.moveTo(150, 180);
    context.lineTo(180, 210);
    context.stroke();
  }
  if (lives <= 0) {
    // Pernas
    context.beginPath();
    context.moveTo(150, 230);
    context.lineTo(120, 260);
    context.moveTo(150, 230);
    context.lineTo(180, 260);
    context.stroke();

    context.beginPath();
    // Olho esquerdo
    context.moveTo(140, 120);
    context.lineTo(130, 110);
    context.moveTo(130, 120);
    context.lineTo(140, 110);
    
    // Olho direito
    context.moveTo(160, 120);
    context.lineTo(170, 110);
    context.moveTo(170, 120);
    context.lineTo(160, 110);
    context.stroke();
  }
}


function revealWord() {
  wordElement.innerHTML = word.split('').join(' '); // Mostrar a palavra completa
}


function checkGameOver() {
    if (lives === 0) {
      revealWord();
      alert('Você perdeu! A palavra era: ' + word);
      gameOver = true;
    } else if (!wordElement.innerText.includes('_')) {
      alert('Parabéns, você ganhou!');
      gameOver = true; 
    }
  }
  

function guessLetter() {
  if (gameOver) return;

  const guess = guessInput.value.toLowerCase();
  guessInput.value = '';

  if (guess && !guessedLetters.includes(guess) && !wrongLetters.includes(guess)) {
    if (word.includes(guess)) {
      guessedLetters.push(guess);
    } else {
      wrongLetters.push(guess);
      lives--;
    }

    displayWord();
    wrongLettersElement.innerText = wrongLetters.join(', ');
    livesElement.innerText = lives;

    drawHangman();  
    checkGameOver();
  }
}


function guessWholeWord() {
  if (gameOver) return;

  const guessedWord = guessWordInput.value.toLowerCase();
  guessWordInput.value = '';

  if (guessedWord === word) {
    alert('Parabéns, você adivinhou a palavra!');
    gameOver = true;
    revealWord();
  } else {
    lives = 0;
    drawHangman();
    revealWord();
    checkGameOver();
  }
}


function resetGame() {
  guessedLetters = [];
  wrongLetters = [];
  lives = 6;
  word = words[Math.floor(Math.random() * words.length)];  // Seleciona nova palavra
  gameOver = false; // Reiniciar o estado de jogo
  displayWord();
  wrongLettersElement.innerText = '';
  livesElement.innerText = lives;
  drawHangman();
}


displayWord();
