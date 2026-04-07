
const form = document.getElementById("contactForm");
const output = document.getElementById("output");

function displayData() {
  const data = localStorage.getItem("contact");

  if (data) {
    const user = JSON.parse(data);

    output.innerHTML = `
      <p>Имя: ${user.name}</p>
      <p>Телефон: ${user.phone}</p>
      <p>Email: ${user.email}</p>
    `;
  }
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const user = {
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    email: document.getElementById("email").value
  };

  localStorage.setItem("contact", JSON.stringify(user));

  displayData();
});

displayData();



