//1

function countdown(seconds) {
  function tick(remaining) {
    if (remaining <= 0) {
      console.log("Время вышло!");
      return;
    }

    console.log(`Осталось: ${remaining} сек`);

    setTimeout(() => {
      tick(remaining - 1);
    }, 1000);
  }

  tick(seconds);
}

countdown(5);


//2

function remindToDrinkWater() {
  setInterval(() => {
    console.log("Не забудь выпить воды!");
  }, 30 * 60 * 1000);
}

remindToDrinkWater();

//3

let intervalId = null;
let isRunning = false;

const delayInput = document.getElementById("delay");
const textInput = document.getElementById("text");
const button = document.getElementById("startBtn");

button.addEventListener("click", () => {
  const delay = Number(delayInput.value);
  const text = textInput.value;

  if (!delay || !text) {
    console.log("Введите корректные данные");
    return;
  }

  if (!isRunning) {
    intervalId = setInterval(() => {
      console.log(text);
    }, delay);

    button.textContent = "Остановить";
    isRunning = true;
  } else {
    clearInterval(intervalId);
    button.textContent = "Начать";
    isRunning = false;
  }
});