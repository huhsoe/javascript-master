//1

function getUserData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = {
        name: "Софья",
        age: 25,
        city: "Москва"
      };

      resolve(user);
    }, 2000);
  });
}

getUserData()
  .then((user) => {
    console.log("Данные получены:", user);
    return user.name;
  })
  .then((name) => {
    const message = `Пользователь: ${name}`;
    return message;
  })
  .then((message) => {
    console.log(message);
  })
  .catch((error) => {
    console.log("Ошибка:", error);
});


//2

function getData1() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Данные из первого источника (3 сек)");
    }, 3000);
  });
}

function getData2() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Данные из второго источника (5 сек)");
    }, 5000);
  });
}

Promise.all([getData1(), getData2()])
  .then((results) => {
    console.log("Оба промиса выполнены");
    console.log("Результаты:", results);
  })
  .catch((error) => {
    console.log("Ошибка:", error);
});


//3

function getData1() {
  return new Promise((resolve) => {
    const delay = Math.floor(Math.random() * 4000) + 1000;

    setTimeout(() => {
      resolve(`Первый промис выполнен за ${delay} мс`);
    }, delay);
  });
}

function getData2() {
  return new Promise((resolve) => {
    const delay = Math.floor(Math.random() * 4000) + 1000;

    setTimeout(() => {
      resolve(`Второй промис выполнен за ${delay} мс`);
    }, delay);
  });
}

Promise.race([getData1(), getData2()])
  .then((result) => {
    console.log("Первым завершился:", result);
  })
  .catch((error) => {
    console.log("Ошибка:", error);
});