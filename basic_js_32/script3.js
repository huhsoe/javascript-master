const button = document.getElementById("loadPosts");
const list = document.getElementById("postList");

button.addEventListener("click", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await response.json();

  list.innerHTML = "";

  posts.slice(0, 10).forEach(post => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${post.id}. ${post.title}
      <button data-id="${post.id}">Удалить</button>
    `;

    list.appendChild(li);
  });
});

async function deletePost(id, element) {
  try {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE"
    });

    element.remove();
  } catch (error) {
    console.error("Ошибка удаления:", error);
  }
}

list.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const id = e.target.getAttribute("data-id");
    const li = e.target.parentElement;

    deletePost(id, li);
  }
});