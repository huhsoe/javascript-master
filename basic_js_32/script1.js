const form = document.getElementById("postForm");
const result = document.getElementById("result");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const postData = {
    userId: document.getElementById("userId").value,
    title: document.getElementById("title").value,
    body: document.getElementById("body").value
  };

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    });

    const data = await response.json();

    result.innerHTML = `
      <p><strong>ID:</strong> ${data.id}</p>
      <p><strong>User ID:</strong> ${data.userId}</p>
      <p><strong>Заголовок:</strong> ${data.title}</p>
      <p><strong>Текст:</strong> ${data.body}</p>
    `;
  } catch (error) {
    result.textContent = "Ошибка при отправке данных";
    console.error(error);
  }
});