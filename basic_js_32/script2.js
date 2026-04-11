const button = document.getElementById("loadPosts");
const list = document.getElementById("postList");

button.addEventListener("click", async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await response.json();

    list.innerHTML = "";

    posts.forEach(post => {
      const li = document.createElement("li");
      li.textContent = `${post.id}. ${post.title}`;
      list.appendChild(li);
    });

  } catch (error) {
    console.error("Ошибка:", error);
  }
});