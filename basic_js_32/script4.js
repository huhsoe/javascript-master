const result = document.getElementById("result");
const button = document.getElementById("updateBtn");

button.addEventListener("click", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users/1", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id: 1,
      name: "Софья",
      email: "sop@mail.com",
      username: "soph123"
    })
  });

  const data = await response.json();

  result.innerHTML = `
    <p>ID: ${data.id}</p>
    <p>Имя: ${data.name}</p>
    <p>Email: ${data.email}</p>
    <p>Username: ${data.username}</p>
  `;
});


/* patch обновляет только часть данных

{
  email: "new@mail.com"
}*/
