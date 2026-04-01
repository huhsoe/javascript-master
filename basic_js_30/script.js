//1

const outer = document.querySelector(".outer");
const middle = document.querySelector(".middle");
const inner = document.querySelector(".inner");

outer.addEventListener("click", () => {
  console.log("outer");
});

/*middle.addEventListener("click", () => {
  console.log("middle");
});*/

inner.addEventListener("click", () => {
  console.log("inner");
});

//2


middle.addEventListener("click", (event) => {
  console.log("middle");
  event.stopPropagation(); 
});

//3

const form = document.getElementById("myForm");

form.addEventListener("input", function (event) {
  if (event.target.tagName === "INPUT") {
    const value = event.target.value;

    if (value.length > 20) {
      event.target.style.border = "2px solid red";
    } else {
      event.target.style.border = "2px solid green";
    }
  }
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
});
