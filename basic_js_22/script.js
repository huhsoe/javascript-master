//1

function greet() {
    let message = "hello!"; //message имеет локальную область видимости
    console.log(message); 
}

greet();

console.log(message); // не выводит потому что message не существует за пределами greet()


//2

function myPlaylist() {
    let song1 = "Wonderwall"; // Переменная внутри функции
    console.log(song1);  // Внутри функции видим
}

myPlaylist(); // Wonderwall

console.log(song1); // переменная не доступна вне блока

//3

//hoisting функций (работает полностью)
sayHello(); // Выведет "hi", хотя функция объявлена ниже

function sayHello() {
    console.log("hi");
}

//hoisting var (поднимает объявление, но не значение)
console.log(name); // выведет undefined
var name = "Ivan";

//hoisting let и const 
console.log(pi); 
// Ошибка: Uncaught ReferenceError: Cannot access 'pi' before initialization
const pi = 3.14;
console.log("smth");

