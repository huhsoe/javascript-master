//1

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function run() {
  console.log("Ожидание...");

  await delay(2000);

  console.log("Задержка завершена");
}

run();

//2

async function fetchUserData() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users/1");

    if (!response.ok) {
      throw new Error("Ошибка получения данных");
    }

    const user = await response.json();

    return user;
  } catch (error) {
    console.log("Ошибка:", error);
  }
}

fetchUserData().then((user) => {
  console.log("Данные пользователя:", user);
});
