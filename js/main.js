let timer = 100;
let score = 0;
let timerInterval;
let timeMessage = moment(timer * 1000).format("mm [:] ss");
const theUrl = "https://puzzle-game-a3c05-default-rtdb.firebaseio.com/players.json";

var winSound = new Audio("../sounds/win.wav");
var loseSound = new Audio("../sounds/lose.wav");

const timeCountElement = document.querySelector(".timeCount");
timeCountElement.innerHTML = timeMessage;

document.addEventListener("puzzleLoaded", async function (event) {
  resizeCanvas(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
  timerInterval = setInterval(async function () {
    timer--;
    timeMessage = moment(timer * 1000).format("mm [:] ss");
    timeCountElement.innerHTML = timeMessage;
    if (timer <= 0) {
      var currentPlayer = JSON.parse(localStorage.getItem("player"));
      currentPlayer.score = score;

      localStorage.removeItem("player");
      const response = await fetch(theUrl, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentPlayer),
      });
      loseSound.play();
      clearInterval(timerInterval);
      document.querySelector(".ui-container").classList.add("disabled");
      document.querySelector("#actualImageBox").classList.add("disabled");
      document.querySelector("canvas").classList.add("disabled");
      document.querySelector("#losePopup").classList.remove("disabled");
      return;
    }
  }, 1000);
});

document.addEventListener("puzzleSolved", async function (event) {
  clearInterval(timerInterval);
  winSound.play();
  score = (timer / 100) * 1000;
  document.getElementById("score").innerHTML = score;
  var currentPlayer = JSON.parse(localStorage.getItem("player"));
  currentPlayer.score = score;

  const response = await fetch(theUrl, {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(currentPlayer),
  });
  localStorage.removeItem("player");
});
