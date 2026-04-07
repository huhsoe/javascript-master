const timeElement = document.getElementById("time");

let seconds = Number(sessionStorage.getItem("activeTime")) || 0;

timeElement.textContent = seconds + " сек";

setInterval(() => {
  seconds++;

  timeElement.textContent = seconds + " сек";

  sessionStorage.setItem("activeTime", seconds);
}, 1000);