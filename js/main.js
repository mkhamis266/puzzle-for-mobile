let timer = 50; // 5 seconds
let timerInterval;
let timeMessage = moment(timer * 1000).format("mm [:] ss");

var winSound = new Audio("../sounds/win.wav");
var loseSound = new Audio("../sounds/lose.wav");

const timeCountElement = document.querySelector(".timeCount");
timeCountElement.innerHTML = timeMessage;

document.addEventListener("puzzleLoaded", function (event) {
  resizeCanvas(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
  timerInterval = setInterval(function () {
    console.log(timer);
    timer--;
    timeMessage = moment(timer * 1000).format("mm [:] ss");
    timeCountElement.innerHTML = timeMessage;
    if (timer <= 0) {
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

document.addEventListener("puzzleSolved", function (event) {
  clearInterval(timerInterval);
  winSound.play();
});
