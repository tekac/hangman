// Variables

const canvas = document.getElementById("hangman");
const context = canvas.getContext("2d");
const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const alphabet = alpha.map((x) => String.fromCharCode(x));
const url = "https://random-word-api.herokuapp.com/word?number=10";
let guesses = [];

// Fetch Word API && Guess Logic

async function getWords() {
  let response = await fetch(url);
  let words = await response.json();

  let wordHolder = document.getElementById("hold");
  let correct = document.createElement("ul");

  for (i = 0; i < words.length; i++) {
    correct.setAttribute("id", "my-word");
    guess = document.createElement("li");
    guess.setAttribute("class", "guess");
    guess.innerHTML = "_";

    guesses.push(guess);
    wordHolder.appendChild(correct); // appends the correct container holding guesses to the DIV
    correct.appendChild(guess); // appends our "guesses" to the correct UL
  }
}
getWords();

// Generate Alphabet Buttons

const btns = function () {
  let myAlphabet = document.getElementById("alpha-btn");
  let letters = document.createElement("ul");

  for (let i = 0; i < alphabet.length; i++) {
    letters.id = "alphabet";
    let list = document.createElement("li");
    list.id = "letter";
    list.innerHTML = alphabet[i];
    myAlphabet.appendChild(letters);
    letters.appendChild(list);
  }
};

Draw = (part) => {
  switch (part) {
    case "head":
      context.lineWidth = 5;
      context.beginPath();
      context.arc(100, 50, 25, 0, Math.PI * 2, true);
      context.closePath();
      context.stroke();
      break;

    case "body":
      context.beginPath();
      context.moveTo(100, 75);
      context.lineTo(100, 140);
      context.stroke();
      break;

    case "rightHarm":
      context.beginPath();
      context.moveTo(100, 85);
      context.lineTo(60, 100);
      context.stroke();
      break;

    case "leftHarm":
      context.beginPath();
      context.moveTo(100, 85);
      context.lineTo(140, 100);
      context.stroke();
      break;

    case "rightLeg":
      context.beginPath();
      context.moveTo(100, 140);
      context.lineTo(80, 190);
      context.stroke();
      break;

    case "rightFoot":
      context.beginPath();
      context.moveTo(82, 190);
      context.lineTo(70, 185);
      context.stroke();
      break;

    case "leftLeg":
      context.beginPath();
      context.moveTo(100, 140);
      context.lineTo(125, 190);
      context.stroke();
      break;

    case "leftFoot":
      context.beginPath();
      context.moveTo(122, 190);
      context.lineTo(135, 185);
      context.stroke();
      break;
  }
};

const draws = [
  "head",
  "body",
  "rightHarm",
  "leftHarm",
  "rightLeg",
  "leftLeg",
  "rightFoot",
  "leftFoot",
];
let step = 0;

const next = document.getElementById("next");

window.onload = function () {
  function draw() {
    context.strokeStyle = "#4B4E53";
    context.lineWidth = 10;
    context.beginPath();
    context.moveTo(175, 225);
    context.lineTo(5, 225);
    context.moveTo(40, 225);
    context.lineTo(25, 5);
    context.lineTo(100, 5);
    context.lineTo(100, 25);
    context.stroke();
  }
  draw();
};

next.addEventListener("click", function () {
  Draw(draws[step++]);
  if (undefined === draws[step]) this.disabled = true;
});

clearCanvas = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
};

document.getElementById("reset").addEventListener("click", function () {
  clearCanvas();
  step = 0;
  next.disabled = false;
});

btns();
