// 1 задание
// Возьмите следующий код и приведите его в соответствие с общепринятым стандартом форматирования,
// соблюдая отступы, выравнивание и правила расстановки пробелов:
/* function multiply(a,b){
  return a*b;
}
const person ={name:'Alice',age:30};
if(person.age>18){console.log('Adult');}
else{console.log('Minor');} */

function multiply(a, b) {
  return a * b;
}

const person = { name: 'Alice', age: 30 };

if (person.age > 18) {
    console.log('Adult');
  } else {
    console.log('Minor');
}

// 2 задание
// Представьте, что вы работаете в команде, и вам нужно сделать код понятным для всех участников.
// Перепишите следующий код, используя понятные и логичные имена переменных и функций:
/*function x(a, b) {
  let c = a * b;
  return c;
}
let d = x(5, 10);*/

function calculateArea(width, height) {
  let area = width * height;
  return area;
}

let result = calculateArea(5, 10);
console.log(result);

// 3 задание
// Убедитесь, что в коде используется единый стиль оформления. В следующем коде присутствуют смешанные стили кавычек,
// разное использование var, let, и const, а также различное форматирование объектов и массивов. Исправьте код:
/*let items = ["apple", 'banana', "orange"];
let price = {apple: 1, banana: 2, orange:3 };
const total = price['apple'] + price["banana"] + price.orange;

function calculateTotal(items) {
  return items.reduce(function(total, item) {return total + item.price; }, 0); }*/


const items = [
  {name: 'apple', price: 1},
  {name: 'banana', price: 2},
  {name: 'orange', price: 3}
];
const total = calculateTotal(items);

function calculateTotal(items) {
  return items.reduce((total, item) => total + item.price, 0);
}

console.log(total);


// 4 задание
// Создайте функцию validateForm, которая принимает объект формы с полями name, email и password.
// Она должна выполнять проверки для каждого поля. Если какое-то поле не заполнено или содержит неверные данные,
// функция должна сразу возвращать ошибку, используя guard expressions. Если все данные верны,
// функция должна возвращать сообщение "Форма успешно отправлена".

function validateForm(formData) {
  if (!formData.name || formData.name.trim().length <= 1) {
    console.log('Name should consist of more than 1 symbol');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email || !emailRegex.test(formData.email)) {
    console.log('Wrong email format');
    return;
  }

  if (!formData.password || formData.password.length < 6) {
    console.log('Password should consist of 6 symbols minimum');
    return;
  }

  console.log('Form is validated');
};